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

const createResultString = (key, displayedNum, state) => {
  const keyContent = key.textContent;
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
    return firstValue &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
      ? calculate(firstValue, operator, displayedNum)
      : displayedNum;
  }

  if (keyType === "equal") {
    return firstValue
      ? previousKeyType === "equal"
        ? calculate(firstValue, operator, modValue)
        : calculate(firstValue, operator, diplayedNum)
      : displayedNum;
  }

  if (keyType === "clear") return "0";
};

const updateCalculatorState = (
  key,
  calculator,
  calculatedValue,
  displayedNum
) => {
  const keyType = getKeyType(key);
  const {
    firstValue,
    operator,
    modValue,
    previousKeyType
  } = calculator.dataset;

  calculator.dataset.previousKeyType = keyType;

  if (keyType === "operator") {
    calculator.dataset.operator = key.dataset.action;
    calculator.dataset.firstValue =
      firstValue &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
        ? calcValue
        : displayedNum;
  }

  if (keyType === "clear" && key.textContent === "AC") {
    calculator.dataset.firstValue = "";
    calculator.dataset.modValue = "";
    calculator.dataset.operator = "";
    calculator.dataset.previousKeyType = "";
  }

  if (keyType === "equal") {
    calculator.dataset.modValue =
      firstValue && previousKeyType === "calculate" ? modValue : displayedNum;
  }
};

const updateVisualState = (key, calculator) => {
  const keyType = getKeyType(key);
  Array.from(key.parentNode.children).forEach(k =>
    k.classList.remove("is-depressed")
  );

  if (keyType === "operator") {
    key.classList.add("is-depressed");
  }

  if (keyType === "clear") {
    key.textContent = "AC";
  }

  if (keyType !== "clear") {
    const clearButton = calculator.querySelector("[data-action=clear]");
    clearButton.textContent = "CE";
  }
};

const calculator = document.querySelector(".calculator");
const calcDisplay = document.querySelector(".calc__display");
const keypad = document.querySelector(".calc__keypad");

keypad.addEventListener("click", e => {
  if (e.target.closest("button")) return;
  const key = e.target;
  const displayedNum = calcDisplay.textContent;

  const resultString = createResultString(
    key,
    displayedNum,
    calculator.dataset
  );

  displayedNum.textContent = resultString;
  updateCalculatorState(key, calculator, resultString, displayedNum);
  updateVisualState(key, calculator);
});
