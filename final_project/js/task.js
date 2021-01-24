const taskContainer = document.querySelector(".js-task");
const taskInputBox = taskContainer.querySelector("input");
const taskList = document.querySelector(".js-taskList");

let tasks = [];

function delBtnHandler(event){
    const del_li = event.target.parentNode;

    taskList.removeChild(del_li);

    const updateTasks = tasks.filter(function(todo){
        return todo.id !== parseInt(del_li.id);
    })

    tasks = updateTasks;
    saveTasks();
}

function saveTasks(){
    localStorage.setItem("todo",JSON.stringify(tasks));
}

function displayTasks(text){

    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const ID = tasks.length+1;

    delBtn.innerHTML = "❌";
    delBtn.className = "toDo_button";
    delBtn.addEventListener("click",delBtnHandler);
    span.innerHTML = text;
    span.className = "toDo";

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = ID;

    taskList.appendChild(li);

    const taskObj = {
        text:text,
        id:ID
    }
    tasks.push(taskObj);
    saveTasks();
}

function submitHandler (event) {
    event.preventDefault();
    const currentValue = taskInputBox.value;
    //console.log(currentValue);
    displayTasks(currentValue);
    taskInputBox.value="";
}

function loadTasks (){
    const savedTasks = localStorage.getItem("todo");
    if(savedTasks !== null) {
        const parsedTasks = JSON.parse(savedTasks);
        parsedTasks.forEach (function(todo){
            displayTasks(todo.text);
        })
    }
}

function init(){
    loadTasks();
    taskContainer.addEventListener("submit",submitHandler);
}

init();