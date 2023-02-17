// DECLARATIONS
let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.getElementById("equalsBtn");
const clearButton = document.getElementById("clearBtn");
const deleteButton = document.getElementById("deleteBtn");
const pointButton = document.getElementById("pointBtn");
const percentBtn = document.getElementById("percentBtn");
const lastOperationScreen = document.getElementById("lastOperationScreen");
const currentOperationScreen = document.getElementById(
  "currentOperationScreen"
);

// OPERATE
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, a, b) {
  // eslint-disable-next-line no-param-reassign
  [a, b] = [Number(a), Number(b)];
  switch (operator) {
    case "+":
      return add(a, b);
    case "−":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      return divide(a, b);
    default:
      return null;
  }
}

// UPDATE SCREEN
function resetScreen() {
  currentOperationScreen.textContent = "";
  shouldResetScreen = false;
}

function clear() {
  currentOperationScreen.textContent = "0";
  lastOperationScreen.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

function appendNumber(number) {
  if (currentOperationScreen.textContent === "0" || shouldResetScreen)
    resetScreen();
  currentOperationScreen.textContent += number;
}

function appendPoint() {
  if (shouldResetScreen) resetScreen();
  if (currentOperationScreen.textContent === "")
    currentOperationScreen.textContent = "0";
  if (currentOperationScreen.textContent.includes(".")) return;
  currentOperationScreen.textContent += ".";
}

function deleteNumber() {
  currentOperationScreen.textContent = currentOperationScreen.textContent
    .toString()
    .slice(0, -1);
}

// EVALUATE
function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === "÷" && currentOperationScreen.textContent === "0") {
    // eslint-disable-next-line no-alert
    alert("You can't divide by 0!");
    return;
  }
  secondOperand = currentOperationScreen.textContent;
  currentOperationScreen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstOperand = currentOperationScreen.textContent;
  currentOperation = operator;
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}

function percent() {
  const currentValue = parseFloat(currentOperationScreen.textContent);
  const percentValue = currentValue / 100;
  currentOperationScreen.textContent = percentValue.toString();
}

// KEYBOARD INPUTS
function convertOperator(keyboardOperator) {
  const operatorSymbols = {
    "/": "÷",
    "*": "×",
    "-": "−",
    "+": "+",
  };
  return operatorSymbols[keyboardOperator] || null;
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendPoint();
  if (e.key === "%") percent();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperation(convertOperator(e.key));
}

// INIT
window.addEventListener("keydown", handleKeyboardInput);
equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);
percentBtn.addEventListener("click", percent);

numberButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);
