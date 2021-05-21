const calcNumberButtons = document.querySelectorAll('.number-button');
const calcOperatorButtons = document.querySelectorAll('.operator-button');
const calcEqualsButton = document.querySelector('#equals-button');
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

//Calculator's number buttons, allows user to type a full number
//TODO: ALLOW DECIMAL INPUT
function display(button) {
    displayText.textContent += button.target.textContent;
    console.log(typeof button.target.textContent);
    if(displayObject.displayOperator){
        displayObject.secondInputNum += button.target.textContent;
    } else {
        displayObject.firstInputNum += button.target.textContent;
    }
    console.log(displayObject);
}

//Fires on click of operator buttons and concatenates to the display
//TODO: CHECK IF THERE ARE ALREADY TWO NUMBERS OR ALREADY AN OPERATOR
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
    displayText.textContent = operate(displayObject.firstInputNum, 
        displayObject.secondInputNum, window[displayObject.displayOperator]);
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
    a = parseInt(a);
    b = parseInt(b);
    return (operator(a, b));
}