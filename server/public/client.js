$(document).ready(onReady);

function onReady() {
    console.log('--- jQuery is connected! ---');

    $('#equation_input_container').on('click', '#equals_button', collectEquationInputs)
};

let firstNumber;
let operation;
let secondNumber;
// global vars to temporarily store user input values

function collectEquationInputs() {
    console.log(`--- In sendEquationInputs! ---`);
    // Test to see if function is connected to click event.

    firstNumber = $('#first_number').val();
    operation = $('#operation_select').val();
    secondNumber = $('#second_number').val();
    // Assign input values from html and assign to vars.
    console.log(`These are the user's inputs:`,firstNumber, operation, secondNumber);
    // Test to see if values are connected properly.

    sendEquationInputs();
};

function sendEquationInputs() {
    console.log(`--- In sendEquationInputs! ---`);
    // Test for connection.

    let equation = {
        firstNumber: firstNumber,
        operation: operation,
        secondNumber: secondNumber
    };
    // Create an equation object from user input values.
    console.log(equation);
    // Test for connection.

    $.ajax({
        url:'/calculate',
        method: 'POST',
        data: equation // send server 'equation' object
    }).then(() => {
        console.log('POSTed equation input!');
    });
};