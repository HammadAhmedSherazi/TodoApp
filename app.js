var list = document.getElementById('list');
var database = firebase.database().ref('Todo Items');
    database.on('child_added', function(data){
    
    // //Input shift into list through create Li in the list
    var li = document.createElement('li');
    //li.innerHTML = item.value;
    
    var text = document.createElement('span');
    text.append(data.val().value);
    li.appendChild(text);

    list.appendChild(li);
    // //create checkbox
    var checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('id', 'check');
    checkBox.setAttribute('onclick', 'check(this)');
    checkBox
    li.appendChild(checkBox);
    li.insertBefore(li.lastChild, li.firstChild);


    // //Create a edit button and set attributes
    var editbtn = document.createElement('button');
    editbtn.setAttribute('class', 'btn btn-success');
    editbtn.setAttribute('id',  data.val().key);
    editbtn.setAttribute('onclick', 'editItem(this)');
    editbtn.innerHTML = "Edit";

    li.appendChild(editbtn);

    // //Create a delete button and set attributes
    var delbtn = document.createElement('button');
    delbtn.setAttribute('id', 'delbtn');
    delbtn.setAttribute('class', 'btn btn-dark');
    delbtn.setAttribute('id', data.val().key);
    delbtn.setAttribute('onclick', 'delItem(this)')
    delbtn.innerHTML = "Delete";
    li.appendChild(delbtn);

    var span1 = document.createElement('span');
    span1.setAttribute('id', 'span1');
    span1.appendChild(editbtn);
    span1.appendChild(delbtn);

    li.appendChild(span1);

    

    
    
 
    
})

   
function addItem(){
    //Get Input of TODO Item
    var item = document.getElementById('input');
    var key = database.push().key;
    var todoItem = {
        value : item.value, 
        key : key
    }

    
    database.child(key).set(todoItem);
    item.value = "";

}
function delItem(thisNode){
    thisNode.parentNode.parentNode.remove();
    database.child(thisNode.id).remove();

}
function delAllItem(){
    database.remove();
    list.innerHTML = "";
}

function check(thisNode){
   var checkBox = thisNode;
   checkBox.checked = true;
   checkBox.disabled = true;
   

	var editbtn = thisNode.parentNode.lastChild.firstChild;
	editbtn.style.display = 'none';
	var parent = thisNode.parentNode;
	parent.style.opacity = '0.5';
	del = document.createElement('del');
	var txt = parent.childNodes[0].nextSibling.innerHTML;
	var editedtxt = document.createTextNode(txt);
	del.appendChild(editedtxt);
	parent.appendChild(del);
	parent.insertBefore(parent.lastChild, parent.childNodes[0].nextSibling);
	parent.childNodes[2].remove();
}
function editItem(thisNode){
	var parent = thisNode.parentNode.parentNode;
    var inp = document.createElement('input');
    inp.setAttribute('id','edtinp');
    
    var checkBox = parent.firstChild;
    checkBox.style.display='none';
   
    //create button to add Edited Item
    var addbtn = document.createElement('button');
    addbtn.setAttribute('class', 'btn btn-success addbtn');
    addbtn.setAttribute('onclick', 'addEdit(this)');
    addbtn.setAttribute('id', thisNode.id);
    addbtn.innerHTML = "Add";

    
    

    parent.appendChild(inp);
    parent.insertBefore(parent.lastChild, parent.firstChild);

    var txt = parent.childNodes[2].innerHTML;
    
    inp.setAttribute('value', txt );
    //console.log(li.childNodes[2])
    parent.childNodes[2].remove();
    
    thisNode.parentNode.appendChild(addbtn);
    var span1 = thisNode.parentNode;
    span1.insertBefore(span1.lastChild, span1.firstChild);
    span1.childNodes[1].remove();
    

}
function addEdit(thisNode) {

	var parent = thisNode.parentNode.parentNode;

    var editbtn = document.createElement('button');
    editbtn.setAttribute('class', 'btn btn-success');
    editbtn.setAttribute('onclick', 'editItem(this)');
    editbtn.innerHTML = "Edit";
    
    
    
    var checkBox = parent.childNodes[1];
    checkBox.style.display='inline';

    var span1 = thisNode.parentNode;
    span1.appendChild(editbtn);

    var edinp = document.getElementById('edtinp')
    var txt = edinp.value;

    
    //database
    var UpdateTodo = {
        value : txt,
        key : thisNode.id
    }
    database.child(UpdateTodo.key).set(UpdateTodo);

    ///////////////////////////////

    var editedItem = document.createElement('span');
    var editedItemTxt = document.createTextNode(txt);
    editedItem.appendChild(editedItemTxt);

    var li = span1.parentNode;

    li.insertBefore(editedItem, li.childNodes[2])

    edinp.remove();
    

    span1.insertBefore(span1.lastChild, span1.firstChild);
    span1.childNodes[1].remove();
    



}