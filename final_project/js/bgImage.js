const body = document.querySelector("body");


function displayBG (num){
    const img = new Image();
    img.src =  `./images/${num+1}.jpg`;
    img.classList.add("bgImage");
    body.prepend(img);
}



function generateRandomNum(){
    const num = Math.floor(Math.random()*8);
    return num;
}


function init(){
    const randomNum = generateRandomNum();
    displayBG (randomNum);
}

init();