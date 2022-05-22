$(document).ready(onReady);


let firstNumber;
let operation;
let secondNumber;
// global vars to temporarily store user input values

let serverAnswer = 0;
let serverHistory = [];
// global vars to temp store values send from server side.


function onReady() {
    console.log('--- jQuery is connected! ---');

    $('#equation_input_container').on('click', '#equals_button', collectEquationInputs);
    $('#equation_input_container').on('click', '#clear_button', clearInputs);
    $('#equation_input_container').on('click', '#clear_history', clearHistory)
    // Click events
};

function clearHistory() {
    console.log(`--- In clearHistory function ---`);
    // Test connection

    serverHistory = [];
    $('#history').empty();
    // Change client side stored server history to an empty array and empty the history <li> tags on the DOM.

    $.ajax({
        url: '/delete-history',
        method: 'DELETE'
    }).then((response) => {
        console.log(response);
        // Confirm history delete from server side.
    });
}

function clearInputs(){
    $('#first_number').val('');
    $('#operation_select').val('+'); // resets default value to '+' instead of clearing it.
    $('#second_number').val('');
};

function collectEquationInputs() {
    console.log(`--- In sendEquationInputs! ---`);
    // Test to see if function is connected to click event.

    firstNumber = Number($('#first_number').val());
    operation = $('#operation_select').val();
    secondNumber = Number($('#second_number').val());
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

    getAnswerPlusHist();
};

function getAnswerPlusHist() {
    console.log('--- In getAnswerPlusHist function! ---')
    // Test connection

    $.ajax({
        url: '/calculate',
        method: 'GET'
    }).then((response) => {
        console.log(response);
        // Check if response from server side is correct.

        serverAnswer = response.answer;
        serverHistory = response.history;
        // Assign response key:value to a var.

        $('#answer').empty();
        $('#history').empty();
        // Empty DOM target

        $('#answer').append(`Answer: ${serverAnswer}`);
        // Append DOM target with 'serverAnswer' value.

        for (let item of serverHistory) {
            $('#history').append(`<li>${item}</li>`);
        };
        // Append DOM target with 'serverHistory' values for each item in array.


    });
    // GET request for 'answer' and 'history' from server.

}
