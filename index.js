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
    const displayedNum = calcDisplay.textContent;
    const resultString = createResultString(
      e.target,
      displayedNum,
      calculator.dataset
    );

    Array.from(key.parentNode.children).forEach(k =>
      k.classList.remove("is-depressed")
    );

    const createResultString = (key, displayedNum, state) => {
      const keyContent = key.textContent;
      const { action } = key.dataset;
      const { firstValue, modValue, operator, previousKeyType } = state;
      const keyType = getKeyType(key);

      if (keyType === "number") {
        return displayedNum === "0" ||
          previousKeyType === "operator" ||
          previousKeyType === "equal"
          ? keyContent
          : displayedNum + keyContent;
      }

      if (keyType === "decimal") {
        if (previousKeyType === "operator" || previousKeyType === "equal")
          return "0.";
        if (!displayedNum.includes(".")) return displayedNum + ".";
        return displayedNum;
      }

      if (keyType === "operator") {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;

        return firstValue &&
          operator &&
          previousKeyType !== "operator" &&
          previousKeyType !== "calculate"
          ? calculate(firstValue, operator, displayedNum)
          : displayedNum;
      }

      if (keyType === "equal") {
        let firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const modValue = calculator.dataset.modValue;

        return firstValue
          ? previousKeyType === "equal"
            ? calculate(firstValue, operator, modValue)
            : calculate(firstValue, operator, diplayedNum)
          : displayedNum;
      }

      if (keyType !== "clear") {
        clearButton.textContent = "CE";
      }

      if (keyType === "clear") return "0";
    };
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

const getKeyType = key => {
  const { action } = key.dataset;

  if (!action) return "number";

  if (
    action === "add" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide"
  )
    return "operator";
  return action;
};
