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
      calculator.dataset.previousKeyType = "number";

      if (displayedNum === "0" || previousKeyType === "operator") {
        calcDisplay.textContent = keyContent;
      } else {
        calcDisplay.textContent = displayedNum + keyContent;
      }
    }

    if (action === "decimal") {
      calculator.dataset.previousKeyType = "decimal";

      calcDisplay.textContent = displayedNum + ".";
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      calculator.dataset.previousKeyType = "operator";

      key.classList.add("is-depressed");
    }

    if (action === "clear") {
      calculator.dataset.previousKeyType = "clear";
      console.log("clear key");
    }

    if (action === "allClear") {
      console.log("All clear key");
    }

    if (action === "equal") {
      calculator.dataset.previousKeyType = "equal";

      const secondValue = displayedNum;
    }
  }
});

const calculate = (n1, operator, n2) => {
  let result = "";

  if (operator === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
};

/// ///////////////////////
// My original functionality
/// ///////////////////////
// // Number button functionality
// numButtons.forEach(function(button) {
//   button.addEventListener('click', function() {
//     // Update calculator display
//     calcDisplay.textContent += this.getAttribute('data-value');
//     // Update temporary calculator save variable
//     tempCalcSave += this.getAttribute('data-value');
//     console.log(tempCalcSave);
//     //
//   });
// });

// // Operation button functionality
// opButtons.forEach(function(button) {
//   button.addEventListener('click', function() {
//     // Save current display number to calculation save
//     if (calculationSave == '') {
//       calculationSave = tempCalcSave;
//     }
//     console.log(calculationSave);
//     // Clear temporary calculation save variable
//     tempCalcSave = '';
//     // Add operation to calculation save
//     opText = this.getAttribute('data-operation');
//     calculationSave += opText;
//     // Clear display
//     clearDisplay();
//   });
// });

// // Clear button functionality
// clearButton.addEventListener('click', _ => {
//   // Clear display
//   clearDisplay();
// });

// allClearButton.addEventListener('click', _ => {
//   // Clear display
//   clearDisplay();
//   // Clear calculation save variable
//   clearCalcSave();
// });

// function clearDisplay() {
//   calcDisplay.textContent = '';
// }

// function clearCalcSave() {
//   calculationSave = '';
// }

// const printButton = keypad.querySelector('.printButton');
// printButton.addEventListener('click', () => {
//   console.log(calculationSave);
// });
