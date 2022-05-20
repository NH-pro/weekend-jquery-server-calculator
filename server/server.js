const express = require('express');
// Imports express node_module and makes it a var called 'express'.
const app = express();
// Takes the express function and makes it a var called 'app'.

app.use(express.static('server/public'));
// Share public files to client side.

