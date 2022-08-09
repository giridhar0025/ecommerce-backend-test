const express = require('express');
const router = express.Router();
const inventoryModel = require('../models/inventorymodel')

router.get('/', (req,res) => {
    inventoryModel.find().then((data) => {
        res.status(200).send({inventory : data})
    }).catch((err) => {
        res.status(400).send(err)
    })
})

router.post('/add', (req, res) => {
    inventoryModel.insertMany(req.body.inventory).then(() => {
        res.status(200).send("Data added successfully")
    }).catch((err) => {
        res.status(400).send(err)
    })
})


router.get('/electronics', (req, res) => {
    inventoryModel.find({ inventory_type : "Electronics"}).then((data) => {
        res.status(200).send({electronics : data})
    }).catch((err) => {
        res.status(400).send(err)
    })
})

router.get('/furniture', (req, res) => {
    inventoryModel.find({ inventory_type : "Furniture"}).then((data) => {
        res.status(200).send({furniture : data})
    }).catch((err) => {
        res.status(400).send(err)
    })
})


module.exports = router