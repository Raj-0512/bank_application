/*
require('dotenv').config();

const express = require('express');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(3000 , () => {
    console.log('Server running on port 3000');
}

*/

require("dotenv").config();


const app = require('./app');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

});