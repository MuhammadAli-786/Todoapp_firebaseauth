const firebaseConfig = {
    apiKey: "AIzaSyBWzKati1O5g4fKggjV0qQYBWiz1SCzqI4",
    authDomain: "todoapp-8c392.firebaseapp.com",
    databaseURL: "https://todoapp-8c392-default-rtdb.firebaseio.com",
    projectId: "todoapp-8c392",
    storageBucket: "todoapp-8c392.appspot.com",
    messagingSenderId: "994089342213",
    appId: "1:994089342213:web:f5efe31bee2ba886e2536c"
  };

// Initialize Firebase
const frb = firebase.initializeApp(firebaseConfig);
// console.log(frb.database) // for checking database is connetivity.

firebase
.database()
.ref("todos")
.on("child_added",(data)=>{
    
    var liElement = document.createElement("li");
    var liText = document.createTextNode(data.val().value);
    liElement.appendChild(liText)
    console.log(liElement);

    //Delete button
    var delbtn = document.createElement("button");
    var delbtnText = document.createTextNode("Delete");
    delbtn.appendChild(delbtnText);
    delbtn.setAttribute("id", data.val().key);
    delbtn.setAttribute("onclick","deleteitem(this)")

    var list = document.getElementById("list");
    list.appendChild(liElement);
    liElement.appendChild(delbtn); 


    //Edit button
    var editbtn = document.createElement("button");
    var editbtnText = document.createTextNode("Edit");
    editbtn.appendChild(editbtnText);
    editbtn.setAttribute("onclick","edititem(this)");
    editbtn.setAttribute("id",data.val().key)

    liElement.appendChild(editbtn);

})

function addtodo(){
    var input = document.getElementById("inputfield");
    console.log(input.value)

    var key= firebase.database().ref("todos").push().key;  // generating new key in the database.

    // Creating onject to send data to the firebase.
    let obj ={
        value:input.value,
        key:key
    }

    firebase.database().ref("todos").child(key).set(obj);
    input.value="";
}

function deltodo(){
    var list = document.getElementById("list");
    firebase.database().ref("todos").remove();
    list.innerHTML = ""; 
}

function deleteitem(a){
    // console.log(a.id)
    firebase.database().ref("todos").child(a.id).remove();
    a.parentNode.remove();
}

function edititem(e){
    var val = e.parentNode.firstChild.nodeValue;
    var userInput= prompt("Enter your Value");

    var editValue = {
        value: userInput,
        key:e.id,
    }
    firebase.database().ref("todos").child(e.id).set(editValue);
    e.parentNode.firstChild.nodeValue = userInput;
}