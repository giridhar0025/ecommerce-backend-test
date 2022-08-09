const express = require('express');
const orderModel = require('../models/ordermodel');
const inventoryModel = require('../models/inventorymodel');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res) => {
    try{
        const user = jwt.verify(req.headers.authorization, process.env.secretKey)
        console.log(user)
        orderModel.find({email : user}).then((data) => {
            
            res.status(200).send({data : data})
        }).catch((err) => {
            res.status(400).send(err)
        }) 
    }catch(err) {
        res.status(400).send(err)
    }
})

router.post('/add', (req, res) => {
    try {
        const user = jwt.verify(req.headers.authorization, process.env.secretKey)
        console.log(user)
        inventoryModel.find({ inventory_id : req.body.inventory_id}).then((data) => {
            let stock = data[0].available_quantity
            if (parseInt(stock) >= parseInt(req.body.quantity)) {
                let updateStock = parseInt(stock) - parseInt(req.body.quantity)
                inventoryModel.updateOne({inventory_id : req.body.inventory_id},{ $set: { available_quantity : updateStock }}).then(() => {
                    orderModel.create({
                    customer_id: req.body.customer_id,
                    inventory_id : req.body.inventory_id,
                    item_name : req.body.item_name,
                    quantity : req.body.quantity
                }).then(() => {
                    res.status(200).json("Item added successfully!");
                }).catch((err) => {
                    res.status(400).send(err)
                })
                }).catch((err) => {
                    res.status(400).send("Out of stock")
                })
            } else {
                res.status(400).send("out of stock")
            }
        }).catch((err) => {
            res.status(400).send("Out of Stock")
        })
    } catch(err) {
        console.log(err)
    }
})

module.exports = router