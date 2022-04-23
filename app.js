const express = require('express')
const cors = require('cors')

const routes = require('./routes/index')

const app = express()

app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3000', 'http://localhost:3001'],
    }),
)

app.use(express.json())

app.use('/public', express.static('public'))

app.use('/api/auth', routes.auth)
app.use('/api/upload', routes.upload)
app.use('/api/users', routes.user)

module.exports = app
