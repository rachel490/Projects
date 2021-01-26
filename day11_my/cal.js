const calculator = document.querySelector(".calculator");
const cal_display = calculator.querySelector(".calculator-display");
const cal_keys = calculator.querySelector(".calculator-keys");

function calculate (num1, operator, num2) {
    //현재 num1,num2는 string이므로 숫자로 변환해야함 (parseInt = integer, parseFloat = float)
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    let result = "";

    if(operator === "add"){
        result = n1 + n2;
    } else if (operator === "subtract") {
        result = n1 - n2;
    } else if (operator === "multiply") {
        result = n1 * n2;
    } else if (operator === "divide") {
        result = n1 / n2;
    }
    
    console.log(result);
    return result;
}

function keyHandler(event){
    const key = event.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;     // 누른 버튼의 값
    const displayedNum = cal_display.textContent;      // 디스플레이 창에 보여지는 것
    const previousKeyType = calculator.dataset.previousKeyType;

    if(!action) {   // number을 누른경우

        if(displayedNum === "0" || previousKeyType==="operator"){    // 0인 경우는 시작화면 -> 누른 숫자가 display에 보여져야함
            cal_display.textContent = keyContent;
        } else {                    // 0이 아닌 숫자가 있는 경우 -> 입력한 숫자가 뒤에 붙여짐
            cal_display.textContent = displayedNum + keyContent;
        }

        calculator.dataset.previousKeyType = "number";

    } else if(action === "add" || action === "subtract" || action === "multiply" || action === "divide") {

        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = displayedNum

        if (firstValue && operator && previousKeyType !== 'operator') {
            const calcValue = calculate(firstValue, operator, secondValue)
            cal_display.textContent = calcValue

            // Update calculated value as firstValue
            calculator.dataset.firstValue = calcValue
        } else {
            // If there are no calculations, set displayedNum as the firstValue
            calculator.dataset.firstValue = displayedNum
        }

        key.classList.add("is-depressed");
        //console.log(key.parentNode, key.parentNode.children);
        Array.from(key.parentNode.children).forEach(k=>k.classList.remove('is-depressed'));  //모든 키에 is-depressed라는 class지우기

        //Add custom attribute
        calculator.dataset.previousKeyType = "operator";
        calculator.dataset.operator = action;     // action을 operator에 저장
        

    } else if(action === "decimal"){
        if(!(displayedNum.includes("."))) {
            cal_display.textContent = displayedNum + keyContent;
        } else if(previousKeyType === "operator") {
            cal_display.content = "0.";
        }

        calculator.dataset.previousKeyType = "decimal";

    } else if(action === "clear") {
        cal_display.textContent = "0";
    } else if (action === "calculate") {
        const firstValue = calculator.dataset.firstValue; // 연산자 눌렀을때 dataset에 저장했던 firstValue,operator 다시 가져와서 저장
        const secondValue = displayedNum;
        const operator = calculator.dataset.operator;
        
        // firstValue, operator, secondValue 이용한 연산 결과
        cal_display.textContent  = calculate(firstValue,operator,secondValue);
    
        calculator.dataset.previousKeyType = "calculate";
    }


    



}


function init(){
    cal_keys.addEventListener("click",keyHandler);
}

init();