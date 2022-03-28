const express = require('express');
const cors = require('cors');

const userRoute = require('./routes/users');
const parkingLotRoute = require('./routes/parking_lots');
const userPackageRoute = require('./routes/user_packages');

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

