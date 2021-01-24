
const clockContainer = document.querySelector(".js-clock");
const clock = clockContainer.querySelector("h3");

function time(){ 
    
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    //const seconds = date.getSeconds();
    
    clock.innerText = `${hours<10?`0${hours}`:hours}:${minutes<10?`0${minutes}`:minutes}`;

}


function init(){
    time();
    setInterval(time,1000);
}

init();