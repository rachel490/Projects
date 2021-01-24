
const nameContainer = document.querySelector(".js-name");

function displayName (name) {
    nameContainer.innerHTML = "";
    const greeting = document.createElement("span");
    greeting.innerHTML =  `Hello ${name}`;
    greeting.className = "nameText";
    nameContainer.appendChild(greeting);
}



function saveName(name) {
    localStorage.setItem("userName",name);
}


function submitHandler (event) {
    event.preventDefault();
    const form = event.target;
    const input = form.querySelector("input");
    const name = input.value;

    saveName(name);
    displayName(name);
}

function getName(){
    const input = document.createElement("input");
    input.placeholder = "Type your name here";
    input.type = "text";
    input.className = "nameInput";

    const form = document.createElement("form");
    form.addEventListener("submit",submitHandler);
    form.appendChild(input);
    nameContainer.appendChild(form);
}

function init() {
    const name = localStorage.getItem("userName");
    if(name === null) {
        getName();
    } else {
        displayName(name);
    }
}

init();