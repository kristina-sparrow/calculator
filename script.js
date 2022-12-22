let operator = "";
let previousNums = [];
let currentNum = [];

const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const percentBtn = document.getElementById("percent");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.getElementById("all-clear");
const deleteBtn = document.getElementById("delete");
const lowerDisplay = document.querySelector(".lower-display");
const upperDisplay = document.querySelector(".upper-display");

function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function multiply(a, b) {
  return Number(a) * Number(b);
}

function divide(a, b) {
  return Number(a) / Number(b);
}

function operate(type, a, b) {
  let result = 0;
  // eslint-disable-next-line default-case
  switch (type) {
    case "add":
      result = add(a, b);
      break;
    case "subtract":
      result = subtract(a, b);
      break;
    case "multiply":
      result = multiply(a, b);
      break;
    case "divide":
      result = divide(a, b);
      break;
  }
  return result;
}

function updateLowerDisplay(arr) {
  lowerDisplay.textContent = arr.join("");
}

function updateUpperDisplay(arr) {
  upperDisplay.textContent = arr.join(" ");
}

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    currentNum.push(button.value);
    updateLowerDisplay(currentNum);
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", () => {
    operator = button.id;
    previousNums.push(currentNum.join(""));
    previousNums.push(button.value);
    updateUpperDisplay(previousNums);
    currentNum = [];
    updateLowerDisplay(currentNum);
  });
});

equalBtn.addEventListener("click", () => {
  previousNums.push(currentNum.join(""));
  previousNums.push(equalBtn.value);
  updateUpperDisplay(previousNums);
  currentNum = [];
  currentNum.push(operate(operator, previousNums[0], previousNums[2]));
  updateLowerDisplay(currentNum);
});

deleteBtn.addEventListener("click", () => {
  currentNum.pop();
  previousNums.pop();
  updateLowerDisplay(currentNum);
  if (upperDisplay.textContent !== "") {
    updateUpperDisplay(previousNums);
  }
});

clearBtn.addEventListener("click", () => {
  currentNum = [];
  previousNums = [];
  updateLowerDisplay(currentNum);
  updateUpperDisplay(previousNums);
});
