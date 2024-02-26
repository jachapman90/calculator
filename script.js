
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



addEventListener("click", (event) => {
    let target = event.target;
    let id = target.id;
    //checks for a decimal in the displayed number
    decChck(displayInt);
    //removes visual effect to buttons is depressed
    if (target.classList.contains('btn')) {
    btn.forEach(item => item.classList.remove('dark'));
    btn.forEach(item => item.classList.remove('light'));

    if (target.classList.contains('num')) {
        // stores user input
        let tempVal = parseFloat(target.innerText);

        //prevents 0 from being added to start of displayInt
        if (displayInt === 0) {
            displayInt = tempVal;
        } else {
            //concatenates user input with displayed nummbers
            displayInt = `${displayInt}${tempVal}`;
            console.log(displayInt);
            }
        //this clears the display
            wipeDisp();
        //this populates the display
            popDisp();
    
    } else if (target.classList.contains('op')) {
        
        operatorCase(id);
    }}
})

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
}

function popDisp() {
    const p = document.createElement('p');
    p.textContent = displayInt;
    disp.appendChild(p);
}

function operatorCase(target) {
    console.log(target);
    switch(target) {
        case 'add':
        case 'sub':
        case 'mult':
        case 'div':
//checks for first number to form equation, if it exists, allows user to string
//calculations together i.e. 1 + 4 - 3 * 6
            if (firstInt == false) {
            operator = target;
            firstInt = displayInt;
            displayInt = 0;
            } else if (firstInt != false) {
                operatorCase('eql');
                operator = target;
                firstInt = displayInt;
                displayInt = 0;
            }
            break;

        case 'clr':
            wipeDisp();
            displayInt = 0;
            firstInt = false;
            secondInt = false;
            decSwtch = false;
            popDisp();
            break;

        case 'eql':
            if (firstInt != false && operator != false) {
            secondInt = displayInt;
            displayInt = operate(firstInt, operator, secondInt);
            firstInt = false;
            console.log(firstInt);
            console.log(secondInt);
            console.log(displayInt);
            operator = false;
            wipeDisp();
            popDisp();
            }
            break;

        case 'dec':
            dec();
            wipeDisp();
            popDisp();
            break;

        case 'perc':
            wipeDisp();
            displayInt = displayInt / 100;
            popDisp();
            break;

        case 'plsMns':
            displayInt = displayInt * -1;
            wipeDisp();
            popDisp();
            break;

        case 'del':
            displayInt = displayInt.slice(0, -1);
            wipeDisp();
            popDisp();
            
    }
}


function dec() {
    if (decSwtch == false) {
        displayInt = `${displayInt}.`;
        console.log(displayInt);

    } else if (decSwtch == false && displayInt == 0) {
        displayInt = '0.';
    }
}

function decChck(target) {
    if (target % 1 != 0) {
        decSwtch = true;
    } else {
        decSwtch = false;
    }
}

function opChck() {
    if (operator == false) {
        displayInt = 0;
        wipeDisp();
        popDisp();
    }
}


//these are the math functions
function add(frstInt, scndInt) {
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
let decSwtch = false;



function operate(frstInt, op, scndInt) {
    switch (op){
        case 'add':
            return parseFloat(add(frstInt, scndInt));
            break;
        
        case 'sub':
            return parseFloat(subtract(frstInt, scndInt));
            break;

        case 'mult':
            return parseFloat(multiply(frstInt, scndInt));
            break;

        case 'div':
            if (scndInt === 0) {
                return 'id10T ERROR';
            } else {
                let total = parseFloat(divide(frstInt, scndInt));
            return total.toFixed(6);
            }
            break;

    }   
}

