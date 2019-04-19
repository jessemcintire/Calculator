const calcDisplay = document.querySelector('.calc-display');
let displayText = '';
const keypad = document.querySelector('.keypad');
const numButtons = Array.from(document.querySelectorAll('.numButton'));

numButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    displayText = `${this.getAttribute('data-value')}`;
    calcDisplay.textContent += displayText;
  });
});
