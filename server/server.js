const express = require('express');
// Imports express node_module and makes it a var called 'express'.
const app = express();
// Takes the express function and makes it a var called 'app'.
app.use(express.static('server/public'));
// Share public files to client side.


const bodyParser = require('body-parser');
// Imports body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// body-parser stuff, NOT 100% WHAT IT DOES THOUGH.


app.listen(5000, () => {
    console.log(`The Server is listening...for that sweet sweet client.js voice 👂`);
});
// Server request listener, makes the server run on port 5000.


let equation;
// global var of equation object sent from user on client side.

let answer;
// global var of the answer for the equation.

let history = [];
// global array to store the calculation history.

app.post('/calculate', (req, res) => {
    console.log(`--- In POST /calculate! --- `);
    // Test connection
    equation = req.body;
    // Change 'equation' value to req.body, aka the object sent from client user.

    console.log(`Equation values from user:`, equation);
    // Test connection

    whichCalculation();
    sendBackAnswer();
});

function whichCalculation() {
    console.log(`--- In whichCalculation function! ---`);
     if (equation.operation === '+') {
        answer = Number(equation.firstNumber) + Number(equation.secondNumber);
        history.push( `${equation.firstNumber} + ${equation.secondNumber} = ${answer}`);
     };
     if (equation.operation === '-') {
        answer = Number(equation.firstNumber) - Number(equation.secondNumber);
        history.push( `${equation.firstNumber} - ${equation.secondNumber} = ${answer}`);
     };
     if (equation.operation === '*') {
        answer = Number(equation.firstNumber) * Number(equation.secondNumber);
        history.push( `${equation.firstNumber} * ${equation.secondNumber} = ${answer}`);
     };
     if (equation.operation === '/') {
        answer = Number(equation.firstNumber) / Number(equation.secondNumber);
        history.push( `${equation.firstNumber} / ${equation.secondNumber} = ${answer}`);
     };
     console.log(answer);
}
// This funciton figures out what kind of calculation to plug in our number input values.

function sendBackAnswer() {
    console.log(`--- In sendBackAnswer function ---`);
    console.log(`History array:`,history);
}