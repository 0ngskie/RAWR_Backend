// creating a local server with the port number: 4000

const express = require('express')

const app = express()

const port_number = 4000

// middleware setup
app.use(express.json())

// database setup (MongoDB or dbeaver), 4/8/2024 or 4/15/2024

// route for Rawr related features
const repairshopRoute = require('./routes/repairshopRoute')
const userRoute = require('./routes/userRoute')
const customerRoute = require('./routes/customerRoute')
const employeeRoute = require('./routes/employeeRoute')
const vehicleRoute = require('./routes/vehicleRoute')
const repairJobRoute = require('./routes/repairjobRoute')

app.use('/repairshop', repairshopRoute)
app.use('/user', userRoute)
app.use('/customer', customerRoute)
app.use('/vehicle', vehicleRoute)
app.use('/employee',employeeRoute)
app.use('/repairjob', repairJobRoute)

app.listen(port_number, () => {
    console.log(`server is running on http://localHost:${port_number}`)
})

// to run the backend server use `node index.js`