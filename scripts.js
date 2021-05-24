const calcNumberButtons = document.querySelectorAll('.number-button');
const calcOperatorButtons = document.querySelectorAll('.operator-button');
const calcEqualsButton = document.querySelector('#equals-button');
const calcClearButton = document.querySelector('#clear-button');
let displayText = document.querySelector('#display-container');
displayText.textContent = '';


var displayObject = {
    firstInputNum: "",
    secondInputNum: "",
    displayOperator: "",
}

calcOperatorButtons.forEach(button => button.addEventListener('click', operatorFunction))
calcNumberButtons.forEach(button => button.addEventListener('click', display));
calcEqualsButton.addEventListener('click', finalOperate);
calcClearButton.addEventListener('click', clearCalculator);

function clearCalculator(){
    displayObject.firstInputNum = '';
    displayObject.secondInputNum = '';
    displayObject.displayOperator = '';
    displayText.textContent = '';
}

//Calculator's number buttons, allows user to type a full number
function display(button) {
    let num1 = displayObject.firstInputNum;
    let num2 = displayObject.secondInputNum;
    let nums = num1 + num2;
    
    if(nums.length > 28) {
        return;
    }
    if(num1.indexOf('.') !== -1 && button.target.textContent === '.' && 
        !displayObject.displayOperator){
        return;
    }
    if (num2.indexOf('.') !== -1 && button.target.textContent === '.'){
        return;
    }

    displayText.textContent += button.target.textContent;

    if(displayObject.displayOperator){
        displayObject.secondInputNum += button.target.textContent;
    } else {
        displayObject.firstInputNum += button.target.textContent;
    }
    console.log(displayObject);
}

//Fires on click of operator buttons and concatenates to the display
function operatorFunction(button) {
    if(displayObject.displayOperator){
        return;
    } else {
    displayText.textContent += " " + button.target.textContent + " ";
    displayObject.displayOperator = button.target.id;
      }
}

//Fires on click of = button and calculates both input numbers, displaying the result
function finalOperate() {
    if (!displayObject.secondInputNum){
        return;
    }

    if(displayObject.secondInputNum === "0" && displayObject.displayOperator === 'divide') {
            displayText.textContent = 'So you thought you could beat me...';
            return;
        }
    let num1 = Number(displayObject.firstInputNum);
    let num2 = Number(displayObject.secondInputNum);

    console.log(num1);
    console.log(num2);

    displayText.textContent = (operate(num1, num2, window[displayObject.displayOperator]));

    displayObject.firstInputNum =  `${operate(num1, 
        num2, window[displayObject.displayOperator])}`;

    displayObject.secondInputNum = '';
    displayObject.displayOperator = '';
}

//Operation Functions:
function add (a, b) {
	return (a + b);
}

function subtract (a,b) {
	return (a - b);
}

function multiply(a, b) {
    return (a * b);
}

function divide(a, b) {
    return (a / b);
}

function operate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    return (operator(a, b));
}