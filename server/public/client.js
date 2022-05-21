$(document).ready(onReady);

function onReady() {
    console.log('--- jQuery is connected! ---');

    $('#equation_input_container').on('click', '#equals_button', sendEquationInputs)
};


function sendEquationInputs() {
    console.log(`--- In sendEquationInputs! ---`);
}