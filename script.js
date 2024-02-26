
const btn = document.querySelectorAll('.btn');
const disp = document.querySelector('#disp');

//controls visual effects of pressing buttons
addEventListener("mousedown", (event) => {
    let target = event.target;

    if (target.classList.contains('op')) {
        target.classList.add("light");
    } else if (target.classList.contains('num')) {
        target.classList.add("dark");
    }
})

addEventListener("keydown", (event) => {
    let key = event.key;
    let tempOp;
   // event.preventDefault();

    switch(true) {

        case (key >= 0 && key <= 9):
            userInput(key);
            wipeDisp();
            break;
        
        case (key === '+'):
            tempOp = 'add';
            break;
        
        case (key === '-'):
            tempOp = 'sub';
            break;
        
        case (key === '*'):
            tempOp = 'mult';
            break;

        case (key === '/'):
            tempOp = 'div';
            break;

        case (key.toLowerCase() === 'backspace'):
            del();
            break;

        case (key === 'Enter'):
            tempOp = 'eql';
            break;

        case (key === '.'):
            tempOp = 'dec';
            break;
        
        default:
            break;
    }
    operatorCase(tempOp);


})


addEventListener("click", (event) => {
    let target = event.target;
    let id = target.id;
    //checks for a decimal in the displayed number
    //removes visual effect to buttons is depressed
    if (target.classList.contains('btn')) {
    btn.forEach(item => item.classList.remove('dark'));
    btn.forEach(item => item.classList.remove('light'));

    let clickVal = target.innerText;

    if (target.classList.contains('num')) {
        userInput(clickVal);
        wipeDisp();
    } else if (target.classList.contains('op')) {
        operatorCase(id);
    }}
})

function userInput(input) {
    let tempVal = input;
    //prevents 0 from being added to start of displayInt
    if (displayInt === 0) {
        displayInt = tempVal;
    } else {
        //concatenates user input with displayed nummbers
        displayInt = `${displayInt}${tempVal}`;
        }}

function equationChck(target) {
    if (operator == 'add' || operator == 'sub' || operator == 'mult' || 
    operator == 'div') {
        operatorCase(eql);
    } else {
        operatorCase(target);
    }
}

function wipeDisp() {
    while (disp.firstChild) {
    disp.removeChild(disp.firstChild);}
    const p = document.createElement('p');
    p.textContent = displayInt;
    disp.appendChild(p);
}

function operatorCase(target) {
    switch(target) {
        case 'add':
        case 'sub':
        case 'mult':
        case 'div':
//checks for first number to form equation, if it exists, allows user to string
//calculations together i.e. 1 + 4 - 3 * 6
           if (firstInt != false) {
                operatorCase('eql');
            }
            operator = target;
            firstInt = displayInt;
            displayInt = 0;
            break;

        case 'clr':
            displayInt = 0;
            firstInt = false;
            secondInt = false;
            decSwtch = false;
            wipeDisp();
            break;

        case 'eql':
            if (firstInt != false && operator != false) {
            secondInt = displayInt;
            displayInt = operate(firstInt, operator, secondInt);
            firstInt = false;
            operator = false;
            wipeDisp();
            }
            decChck(displayInt);
            console.log(displayInt);
            break;

        case 'dec':
            dec();
            decSwtch = true;
            wipeDisp();
            break;

        case 'perc':
            displayInt = displayInt / 100;
            wipeDisp();
            break;

        case 'plsMns':
            displayInt = displayInt * -1;
            wipeDisp();
            break;

        case 'del':
            del();
            break;

        default:
            break;
            
    }
}

function del() {
    if (displayInt === 'undefined'){
        displayInt = 0;
    } else {
    displayInt = displayInt.slice(0, -1);
    }
    wipeDisp();
}

//adds decimal to displayed number
function dec() {
    if (decSwtch == false) {
        displayInt = `${displayInt}.`;
    } else if (decSwtch == false && displayInt == 0) {
        displayInt = '0.';
    }
}

//checks for decimal in displayed number
function decChck(target) {
    if (target % 1 != 0) {
        decSwtch = true;
    } else {
        decSwtch = false;
    }
}


//these are the math functions
function add(frstInt, scndInt) {
    //parseFloat prevents string concatenation
    let total = parseFloat(frstInt) + parseFloat(scndInt);
    return total;
}

function subtract(frstInt, scndInt) {
    let total = frstInt - scndInt;
    return total;
}

function multiply(frstInt, scndInt) {
    let total = frstInt * scndInt;
    return total;
}

function divide(frstInt, scndInt) {
    let total = frstInt / scndInt;
    return total;
}

function perc(frstInt, op, scndInt) {
    let perc = scndInt / 10;
    return operate(frstInt, op, perc);
    }

let firstInt = false;
let secondInt = false;
let operator = false;
let displayInt = 0;
wipeDisp();
let decSwtch = false;

function operate(frstInt, op, scndInt) {
    switch (op){
        case 'add':
            return add(frstInt, scndInt);
        
        case 'sub':
            return parseFloat(subtract(frstInt, scndInt));

        case 'mult':
            return parseFloat(multiply(frstInt, scndInt));

        case 'div':
            //prevents divide by 0
            if (scndInt === 0) {
                return 'id10T ERROR';
            } else {
                let total = parseFloat(divide(frstInt, scndInt));
            //rounds to 6 decimal places
            return +total.toFixed(6);
            }

    }   
}

