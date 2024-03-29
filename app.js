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
app.use('/api/wallets', routes.wallet)
app.use('/api/vehicles', routes.vehicle)
app.use('/api/parking-lots', routes.parkingLot)
app.use('/api/parking-prices', routes.parkingPrice)
app.use('/api/packages', routes.package)
app.use('/api/user-packages', routes.userPackage)
app.use('/api/parking-histories', routes.parkingHistory)
app.use('/api/feedbacks', routes.feedback)
app.use('/api/package-types', routes.packageType)
app.use('/api/vehicle-types', routes.vehicleType)
app.use('/api/feedback-types', routes.feedbackType)
app.use('/api/transaction-types', routes.transactionType)
app.use('/api/features', routes.feature)
app.use('/api/roles', routes.role)
app.use('/api/checkin', routes.checkin)
app.use('/api/checkout', routes.checkout)

module.exports = app
