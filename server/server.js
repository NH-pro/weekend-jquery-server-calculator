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

app.post('/calculate', (req, res) => {
    console.log(`--- In POST /calculate! --- `);
    
    equation = req.body;

    console.log(equation);
})