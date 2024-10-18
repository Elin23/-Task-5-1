const keys = document.querySelectorAll(".key");
const operation = document.querySelector(".operation");
const result = document.querySelector(".result");
const history = document.querySelector(".history");
const popUp = document.querySelector(".popup");

//------- first method by using simple conditional statements -------//

let isFirstNumber = true;
let isSecondNumber = false;
let isLastResult = false;
let isOperatorSelected = false;

let firstNumber = '';
let secondNumber = '';
let operator = '';
const operators = ["-", "+", "/", "*", "%"];

function resetCalculator() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    operation.innerHTML = '';
    result.innerHTML = '0';
    isFirstNumber = true;
    isSecondNumber = false;
    isLastResult = false;
    isOperatorSelected = false;
}

let finalResult;
function calcExpression() {
    let firstNum = Number(firstNumber);
    let secNum = Number(secondNumber);
    switch (operator) {
        case "+":
            finalResult = firstNum + secNum;
            break;
        case "-":
            finalResult = firstNum - secNum;
            break;
        case "*":
            finalResult = firstNum * secNum;
            break;
        case "/":
            finalResult = secNum !== 0 ? firstNum / secNum : 'Error: division by zero';
            break;
        case "%":
            finalResult = firstNum % secNum;
            break;
        default:
            finalResult = 'Invalid operator';
    }
    result.innerHTML = finalResult;
    isLastResult = true; // Set this to true, so we use the result which has just calculated

    // save the last Expression in the local storage
    const expression = `${firstNumber} ${operator} ${secondNumber} = ${finalResult}`;
    localStorage.setItem('lastExpression', expression);
}

function eventHandler(event) {
    let value = event.target.textContent;
    if (!isNaN(value) || value == ".") {
        if (isFirstNumber) {
            isLastResult = false; // The user is starting a new calculation, so we clear any last result

            // Ignore if decimal already exists like when the user try to enter 1.1. => Ignore the last (.) 
            if (value === "." && firstNumber.includes(".")) return;  

            firstNumber += value;
            operation.innerHTML = firstNumber;
            
        } else if (isSecondNumber) {
            // Ignore if decimal already exists like when the user try to enter 1.1. => Ignore the last (.)
            if (value === "." && secondNumber.includes(".")) return;

            secondNumber += value;
            operation.innerHTML = `${firstNumber} ${operator} ${secondNumber}`;
        }
    } else if (value == "AC") {
        resetCalculator();
    } else if (operators.includes(value)) {
        if (firstNumber != '' && !isOperatorSelected && !isLastResult) {
            isFirstNumber = false;
            isSecondNumber = true;
            isOperatorSelected = true;
            operator = value;
            operation.innerHTML = `${firstNumber} ${operator}`;
        } else if (isLastResult) {
            //first case: use the result as the first number if any operator was pressed
            operator = value; 
            operation.innerHTML = `${finalResult} ${operator}`; 
            firstNumber = finalResult; 
            isFirstNumber = false;
            secondNumber = '';
            isSecondNumber = true;
            isOperatorSelected = true;
            isLastResult = false;
        }
         else {
            resetCalculator();
            result.innerHTML = 'invalid Expression';
        }
    } else if (value == "=") {
        //second case: use the result as the first number if "=" was pressed
        if (isLastResult == true) {
            resetCalculator();
            firstNumber = finalResult;
            operation.innerHTML = firstNumber;

        } else if (secondNumber != '') {
            calcExpression();
            isSecondNumber = false; 
        } else {
            resetCalculator();
            result.innerHTML = 'invalid Expression';
        }
    }
}

keys.forEach(key => {
    key.addEventListener("click", eventHandler);
});

history.addEventListener("click", function () {
    popUp.innerHTML = '';
    const savedExpression = localStorage.getItem('lastExpression');
    let li = document.createElement("li");
    li.textContent = savedExpression ? savedExpression : "There is no history yet.";
    popUp.appendChild(li);
    popUp.classList.toggle("show-history");
});


//------- second method by using eval() function -------//

/* 
   Note: Using eval() function even if the input comes from buttons is considered unsafe 
   and bad practice. Button inputs may seem to limit user control but security risks still exist.
   I used eval() here only for practicing JavaScript.
*/


// let exp = '';
// currentRes = 0;
// function eventHandler(event){
//     let value = event.target.textContent;
//     if(value == '='){
//         try{
//             currentRes = eval(exp); 
//             result.innerHTML = currentRes;
//         }catch(error){
//             result.innerHTML = "invalid Expression";
//             operation.innerHTML = "";
//         }
//     }else if(value == 'AC'){
//         exp = '';
//         currentRes = 0;
//         operation.innerHTML = exp;
//         result.innerHTML = currentRes;
//     }else{
//         exp += value;
//         operation.innerHTML = exp;
//         result.innerHTML = 0;
//     }
    
// }
// keys.forEach(key => { 
//     key.addEventListener("click", eventHandler)
// });

