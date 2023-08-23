function deleteDone(id){
    console.log("Todo Deleted_" + id);
    document.getElementById("todo_" + id).remove();
}
function deleteTodo(id){
    fetch("http://localhost:3000/todos/" + id,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }

    }).then(function() {
        deleteDone(id);
    });
}

function todosCallback(data){
    console.log(data);
    var parentElement = document.getElementById("mainArea");
    //parentElement.innerHTML = JSON.stringify(data);
    for(var i=0; i<data.length; i++){
        var childElement = document.createElement("div");
        childElement.setAttribute("id", "todo_" + data[i].id);

        var span1 = document.createElement("span");
        span1.innerHTML = data[i].title;
        
        var span2 = document.createElement("span");
        span2.innerHTML = data[i].description;

        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.setAttribute("onclick","deleteTodo(" + data[i].id + ")")

        childElement.appendChild(span1)
        childElement.appendChild(span2)
        childElement.appendChild(deleteButton)

        parentElement.appendChild(childElement);
    }
}
function getDataCallback(resp){
    resp.json().then(todosCallback);
}
function getData(){
    fetch("http://localhost:3000/todos",{
        method:"GET"
    }).then(getDataCallback)
}
getData();


function parsedResponse(data){
    console.log(data);
    var parentElement = document.getElementById("mainArea");
    var childElement = document.createElement("div");

    var span1 = document.createElement("span");
    span1.innerHTML = data.title;
    
    var span2 = document.createElement("span");
    span2.innerHTML = data.description;

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    

    childElement.appendChild(span1)
    childElement.appendChild(span2)
    childElement.appendChild(deleteButton)

    parentElement.appendChild(childElement);
    
}
function callback(resp){
    resp.json().then(parsedResponse);
}   
function onPress(){
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;

    fetch("http://localhost:3000/todos",{
        method: "POST",
        body:JSON.stringify({
            title:title,
            description:description
        }),
        headers: {
            "Content-Type": "application/json"
        }

    }).then(callback)
}

