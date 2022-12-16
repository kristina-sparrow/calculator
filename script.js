//initialize variables
let a = 0;
let b = 0;
let operator = "";
let upperDisplayValue = [];
let lowerDisplayValue = 0;

//declare selectors
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const decimalBtn = document.getElementById("decimal");
const signBtn = document.getElementById("percent");
const equalBtn = document.getElementById("equal");
const clearBtn = document.getElementById("all-clear");
const deleteBtn = document.getElementById("delete");
const lowerDisplay = document.querySelector(".lower-display");
const upperDisplay = document.querySelector(".upper-display");
const showBtns = document.querySelectorAll(".show");

//update display
showBtns.forEach(button => {
    button.addEventListener("click", () => {
        lowerDisplayValue = button.value;
        upperDisplayValue.push(button.value);
        updateDisplay(lowerDisplayValue, upperDisplayValue);
    })
});

deleteBtn.addEventListener("click", () => {
    upperDisplayValue.pop();
    updateDisplay (this.value, upperDisplayValue);
});

clearBtn.addEventListener("click", () => {
    upperDisplayValue = [];
    updateDisplay (this.value, upperDisplayValue);
});

function updateDisplay (num, arr) {
    lowerDisplay.textContent = num;
    upperDisplay.textContent = arr.join(" ");
}

// //update values on button click
// operatorBtns.forEach(button => {
//     button.addEventListener("click", () => {
//         return operator = button.id;
//     })
// })

//math operators
function add (a,b) {
    return a + b;
}

function subtract (a,b) {
    return a - b;
}

function multiply (a,b) {
    return a * b;
}

function divide (a,b) {
    return a / b;
}

function operate (operator,a,b) {
    switch(operator) {
        case "add":
            add(a,b);
            break;
        case "subtract":
            subtract(a,b);
            break;
        case "multiply":
            multiply(a,b);
            break;
        case "divide":
            divide(a,b);
    }
}