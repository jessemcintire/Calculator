const calculator = document.querySelector(".calculator");
const calcDisplay = document.querySelector(".calc__display");
let tempCalcSave = "";
let calculationSave = "";
const keypad = document.querySelector(".calc__keypad");
const numButtons = Array.from(keypad.querySelectorAll(".num-button"));
const opButtons = keypad.querySelectorAll(".op-button");
const clearButton = keypad.querySelector(".clear-button");
const allClearButton = keypad.querySelector(".all-clear-button");

keypad.addEventListener("click", e => {
  if (e.target.closest("button")) {
    const key = e.target;
    const action = key.dataset.operation;
    const keyContent = key.textContent;
    const displayedNum = calcDisplay.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    Array.from(key.parentNode.children).forEach(k =>
      k.classList.remove("is-depressed")
    );

    if (!action) {
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "equal"
      ) {
        calcDisplay.textContent = keyContent;
      } else {
        calcDisplay.textContent = displayedNum + keyContent;
      }

      calculator.dataset.previousKeyType = "number";
    }

    if (action === "decimal") {
      if (previousKeyType === "operator" || previousKeyType === "equal") {
        calcDisplay.textContent = "0.";
      } else if (!displayedNum.includes(".")) {
        calcDisplay.textContent = displayedNum + ".";
      }

      calculator.dataset.previousKeyType = "decimal";
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);

        calcDisplay.textContent = calcValue;
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }

      key.classList.add("is-depressed");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }

    if (action === "equal") {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNum;

      if (firstValue) {
        if (previousKeyType === "equal") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }

        calcDisplay.textContent = calculate(firstValue, operator, secondValue);
      }

      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "equal";
    }

    if (action !== "clear") {
      clearButton.textContent = "CE";
    }

    if (action === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
      }

      calcDisplay.textContent = "0";
      key.textContent = "AC";
      calculator.dataset.previousKeyType = "clear";
    }
  }
});

const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);

  if (operator === "add") return firstNum + secondNum;
  if (operator === "subtract") return firstNum - secondNum;
  if (operator === "multiply") return firstNum * secondNum;
  if (operator === "divide") return firstNum / secondNum;
};
