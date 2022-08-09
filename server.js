const express = require('express')
const mongoose = require('mongoose');
const userController = require('./routes/user')
const inventoryController = require('./routes/inventory')
const orderController = require('./routes/order')


const app = express();

const PORT = 3004

app.listen(PORT, (err) => {
    if (!err) {
        console.log('Server is Running')
    } else {
        console.log(err)
    }
})

mongoose.connect('mongodb://127.0.0.1:27017/api_web_tech_assignment', () => {
    console.log("connected to database")
}, (err) => {
    console.log(err)
})


app.use(express.json())
app.use(express.urlencoded({ extended: false}))



app.get('/', (req, res) => {
    res.send("10 assessment")
})

app.use('/user', userController);

app.use('/inventory', inventoryController);

app.use('/order', orderController);