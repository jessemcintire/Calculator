const calcDisplay = document.querySelector('.calc__display');
let tempCalcSave = '';
let calculationSave = '';
const keypad = document.querySelector('.calc__keypad');
const numButtons = Array.from(keypad.querySelectorAll('.num-button'));
const opButtons = keypad.querySelectorAll('.op-button');
const clearButton = keypad.querySelector('.clear-button');
const allClearButton = keypad.querySelector('.all-clear-button');

keypad.addEventListener('click', e => {
  if (e.target.closest('button')) {
    const key = e.target;
    const action = key.dataset.operation;

    if (!action) {
      console.log('number key!');
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      console.log('operation key');
    }

    if (action === 'decimal') {
      console.log('decimal key');
    }

    if (action === 'clear') {
      console.log('clear key');
    }

    if (action === 'allClear') {
      console.log('All clear key');
    }

    if (action === 'equal') {
      console.log('equals key');
    }
  }
});

//////////////////////////
// My original functionality
//////////////////////////
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
