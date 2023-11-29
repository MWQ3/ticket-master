const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

connectDB()

const app = express()


app.use(express.json())

app.use(express.urlencoded({extended: false}))


app.get('/', (req, res) => {
    res.status(200).send('hi')
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))
app.use(errorHandler)




app.listen(PORT, () => console.log(`server ${PORT}`))