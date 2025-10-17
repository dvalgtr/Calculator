let display = document.getElementById('result');
let historyList = document.getElementById('historyList');
let calculationHistory = [];

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value;
        
        expression = expression.replace(/×/g, '*');
        expression = expression.replace(/÷/g, '/');
        
        let result = eval(expression);
        
        addToHistory(expression + ' = ' + result);
        
        display.value = result;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => clearDisplay(), 1500);
    }
}

function calculateSquareRoot() {
    try {
        let value = eval(display.value || '0');
        let result = Math.sqrt(value);
        addToHistory('√(' + value + ') = ' + result);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

function calculatePower() {
    try {
        let value = eval(display.value || '0');
        let result = Math.pow(value, 2);
        addToHistory('(' + value + ')² = ' + result);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateSin() {
    try {
        let value = eval(display.value || '0');
        let result = Math.sin(value * Math.PI / 180); // Convert to radians
        addToHistory('sin(' + value + '°) = ' + result.toFixed(4));
        display.value = result.toFixed(4);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateCos() {
    try {
        let value = eval(display.value || '0');
        let result = Math.cos(value * Math.PI / 180);
        addToHistory('cos(' + value + '°) = ' + result.toFixed(4));
        display.value = result.toFixed(4);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateTan() {
    try {
        let value = eval(display.value || '0');
        let result = Math.tan(value * Math.PI / 180);
        addToHistory('tan(' + value + '°) = ' + result.toFixed(4));
        display.value = result.toFixed(4);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateLog() {
    try {
        let value = eval(display.value || '0');
        let result = Math.log10(value);
        addToHistory('log(' + value + ') = ' + result.toFixed(4));
        display.value = result.toFixed(4);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateLn() {
    try {
        let value = eval(display.value || '0');
        let result = Math.log(value);
        addToHistory('ln(' + value + ') = ' + result.toFixed(4));
        display.value = result.toFixed(4);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculatePi() {
    display.value += Math.PI;
}

function calculateE() {
    display.value += Math.E;
}

function calculateFactorial() {
    try {
        let value = parseInt(display.value);
        if (value < 0) throw new Error('Negatif');
        let result = 1;
        for (let i = 2; i <= value; i++) {
            result *= i;
        }
        addToHistory(value + '! = ' + result);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

function addToHistory(calculation) {
    calculationHistory.unshift(calculation);
    if (calculationHistory.length > 5) {
        calculationHistory.pop();
    }
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    historyList.innerHTML = '';
    calculationHistory.forEach(calc => {
        let li = document.createElement('li');
        li.textContent = calc;
        historyList.appendChild(li);
    });
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (/[0-9]/.test(key)) {
        appendToDisplay(key);
    } else if (['+', '-', '*', '/', '(', ')', '.'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});
