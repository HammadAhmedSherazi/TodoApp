var list = document.getElementById('list');
function addItem(){
    //Get Input of TODO Item
    var item = document.getElementById('input');

    //Input shift into list through create Li in the list
    var li = document.createElement('li');
    //li.innerHTML = item.value;
    
    var text = document.createElement('span');
    text.append(item.value);
    li.appendChild(text);

    list.appendChild(li);
    //create checkbox
    var checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('id', 'check');
    checkBox.setAttribute('onclick', 'check(this)');
    checkBox
    li.appendChild(checkBox);
    li.insertBefore(li.lastChild, li.firstChild);


    //Create a edit button and set attributes
    var editbtn = document.createElement('button');
    editbtn.setAttribute('class', 'btn btn-success');
    editbtn.setAttribute('id', 'editbtn');
    editbtn.setAttribute('onclick', 'editItem(this)');
    editbtn.innerHTML = "Edit";

    // li.appendChild(editbtn);

    //Create a delete button and set attributes
    var delbtn = document.createElement('button');
    delbtn.setAttribute('id', 'delbtn');
    delbtn.setAttribute('class', 'btn btn-dark');
    delbtn.setAttribute('onclick', 'delItem(this)')
    delbtn.innerHTML = "Delete";
    // li.appendChild(delbtn);

    var span1 = document.createElement('span');
    // span1.setAttribute('id', 'span1');
    span1.appendChild(editbtn);
    span1.appendChild(delbtn);

    li.appendChild(span1);

    item.value = "";

}
function delItem(thisNode){
    thisNode.parentNode.parentNode.remove();

}
function delAllItem(){
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
	var editedItemTxt = document.createTextNode(txt);
	del.appendChild(editedItemTxt);
	parent.appendChild(del);
	parent.insertBefore(parent.lastChild, parent.childNodes[0].nextSibling);
	parent.childNodes[2].remove();
}
function editItem(thisNode){
    var inp = document.createElement('input');
    inp.setAttribute('id','edtinp');
    
    var checkBox = document.getElementById('check');
    checkBox.style.display='none';
   
    //create button to add Edited Item
    var addbtn = document.createElement('button');
    addbtn.setAttribute('class', 'btn btn-success');
    addbtn.setAttribute('onclick', 'addEdit(this)');
    addbtn.setAttribute('id', 'addEdtbtn');
    addbtn.innerHTML = "Add";

    var li = thisNode.parentNode.parentNode;
    li.appendChild(inp);
    li.insertBefore(li.lastChild, li.firstChild);

    var txt = li.childNodes[2].innerHTML;
    
    inp.setAttribute('value', txt );
    thisNode.parentNode.parentNode.childNodes[2].style.display = 'none';
    
    thisNode.parentNode.appendChild(addbtn);
    var span1 = thisNode.parentNode;
    span1.insertBefore(span1.lastChild, span1.firstChild);
    span1.childNodes[1].remove();
    

}
function addEdit(thisNode) {


    var editbtn = document.createElement('button');
    editbtn.setAttribute('class', 'btn btn-success');
    editbtn.setAttribute('onclick', 'editItem(this)');
    editbtn.innerHTML = "Edit";
    
    var checkBox = document.getElementById('check');
    checkBox.style.display='inline';

    var span1 = thisNode.parentNode;
    span1.appendChild(editbtn);

    var edinp = document.getElementById('edtinp')
    var txt = edinp.value;

    var editedItem = document.createElement('span');
    var editedItemTxt = document.createTextNode(txt);
    editedItem.appendChild(editedItemTxt);

    var li = span1.parentNode;

    li.insertBefore(editedItem, li.childNodes[2])

    edinp.remove();
    

    span1.insertBefore(span1.lastChild, span1.firstChild);
    span1.childNodes[1].remove();
    
    


}
