const express = require('express');
// Imports express node_module and makes it a var called 'express'.
const app = express();
// Takes the express function and makes it a var called 'app'.

app.use(express.static('server/public'));
// Share public files to client side.

app.listen(5000, () => {
    console.log(`The Server is listening...for that sweet sweet client.js voice 👂`);
});
// Server request listener, makes the server run on port 5000.

const bodyParser = require('body-parser');
app.use(bodyParser.json());
// body-parser stuff