const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    credentials: true,
    origin: [
        'http://localhost:3000', 
        'http://localhost:3001',
    ]
}))

app.use(express.json());

app.use('/public', express.static('public'));

module.exports = app