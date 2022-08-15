// Variables
let a = '';
let b = '';
let currentOperation = '';
let isCompleted = false;

const result = document.querySelector('.result');
const digits = document.querySelectorAll('[data-digit]');
const operations = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const clearBtn = document.querySelector('[data-clear]');

// Functions

// function for edge cases
const edgeCase = (message) => {
  result.textContent = message;
  a = '';
  b = '';
  currentOperation = '';
  isCompleted = false;
};

const clearAll = () => {
  edgeCase('0');
};

const cleanScreen = () => {
  result.textContent = '';
};

const equalsFunction = () => {
  if (b === '') b = a;

  switch (currentOperation) {
    case '+':
      a = parseInt(a, 10) + parseInt(b, 10);
      break;
    case '-':
      a = parseInt(a, 10) - parseInt(b, 10);
      break;
    case '*':
      a = parseInt(a, 10) * parseInt(b, 10);
      break;
    case '/':
      if (b === '0') {
        edgeCase('Error');
        return;
      }
      a = parseInt(a, 10) / parseInt(b, 10);
      break;
  }
  isCompleted = true;

  // overflow check
  if (a >= 1e20 || a <= -1e20) {
    edgeCase('Overflow');
    a = 0;
    return;
  }

  result.textContent = a;
};

const enterOperation = (event) => {
  cleanScreen();

  // if currentOperation entered before first number
  if (a === '' && b === '') {
    a = 0;
  }

  // if equals btn is omited and operation btn used
  if (a !== '' && b !== '' && currentOperation !== '' && !isCompleted) {
    equalsFunction();
    currentOperation = event.currentTarget.dataset.operation;
    return;
  }

  currentOperation = event.currentTarget.dataset.operation;
  result.textContent = currentOperation;
};

const enterDigit = (event) => {
  //
  let symbol = event.currentTarget.dataset.digit;

  cleanScreen();

  if (b === '' && currentOperation === '') {
    a += symbol;
    result.textContent = parseInt(a, 10);

    if (a >= 1e20 || a <= -1e20) {
      result.textContent = 'Overflow';
      a = '';
      return;
    }
  }
  /////////////////
  else if (a !== '' && b !== '' && isCompleted) {
    b = symbol;
    isCompleted = false;
    result.textContent = parseInt(b, 10);
  }
  /////////////////
  else {
    b += symbol;
    result.textContent = parseInt(b, 10);

    if (b >= 1e20 || b <= -1e20) {
      result.textContent = 'Overflow';
      b = '';
      return;
    }
  }
};

// Event Listeners
clearBtn.addEventListener('click', clearAll);

digits.forEach((number) => {
  number.addEventListener('click', enterDigit);
});

operations.forEach((operation) => {
  operation.addEventListener('click', enterOperation);
});

equalsBtn.addEventListener('click', equalsFunction);
