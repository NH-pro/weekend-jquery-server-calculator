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

    $(document).on('click', '#equals_button', collectEquationInputs);
    $('#equation_input_container').on('click', '#clear_button', clearInputs);
    $('#equation_input_container').on('click', '#clear_history', clearHistory);
    $('#calculator_container').on('click', '.calc_btn', typeEquation);
    // Click events
};

function typeEquation() {
    console.log(`--- In typeEquation function ---`);
    // Test Connection
    let calcClick = $('#equation_input').val() + $(this).text();
    // Make new var of old input value plus new calc button input value.
    $('#equation_input').append().val(`${calcClick}`);
    // append input field's value with new calc button values.

}

function clearHistory() {
    console.log(`--- In clearHistory function ---`);
    // Test connection

    serverHistory = [];
    $('#history').empty();
    // Change client side stored server history to an empty array and empty the history <li> tags on the DOM.

    $.ajax({
        url: '/delete-history',
        method: 'DELETE'
    }).then(function(response) {
        console.log(response);
        // Confirm history delete from server side.
    });
}

function clearInputs(){
    $('#equation_input').val('');
    // Clears input field by setting its value to ''.
};

function collectEquationInputs() {
    console.log(`--- In collectEquationInputs! ---`);
    // Test to see if function is connected to click event.
    let equationIn = $('#equation_input').val();

    // firstNumber = Number($('#first_number').val());
    // operation = $('#operation_select').val();
    // secondNumber = Number($('#second_number').val());
    // // Assign input values from html and assign to vars.
    // console.log(`These are the user's inputs:`,firstNumber, operation, secondNumber);
    // // Test to see if values are connected properly.

    sendEquationInputs(equationIn);
};

function sendEquationInputs(calculation) {
    console.log(`--- In sendEquationInputs! ---`);
    // Test for connection.

    let equation = {
        eq: calculation
        // firstNumber: firstNumber,
        // operation: operation,
        // secondNumber: secondNumber
    };
    // Create an equation object from user input values.
    console.log(equation);
    // Test for connection.

    $.ajax({
        url:'/calculate',
        method: 'POST',
        data: equation // send server 'equation' object
    }).then(function() {
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
    }).then(function(response) {
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
