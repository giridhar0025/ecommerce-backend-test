const express = require('express');
const router = express.Router();
const SignupModel = require('../models/usermodel')
const { checkExistingUser, generateHash } = require('../utility');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
require('dotenv').config()

router.post('/signup', async (req, res) => {
    let check = await checkExistingUser(req.body.email)
    // console.log(check)
    if (check) {
        res.status(400).send(`User with ${req.body.email}  already exists`)
    } else {
        const passwordHash = await generateHash(req.body.password);
        SignupModel.create({
            username: req.body.username,
            email: req.body.email,
            customer_id: req.body.customer_id,
            password: passwordHash
        }).then(() => {
            res.status(200).send(`${req.body.username} added successfully`)
        }).catch((err) => {
            console.log(err)
        })
    }
})


router.post('/login', (req, res) => {
    SignupModel.find({ email : req.body.email }).then((userData) => {
        if (userData.length) {
            bcrypt.compare(req.body.password, userData[0].password).then((value) => {
                if (value) {
                    const authorization = jwt.sign(userData[0].email, process.env.secretKey)
                    res.status(200).send({ authorization })
                } else {
                    res.status(400).send("Invalid Password");
                }
            }).catch((err) => {
                console.log(err)
            })
        } else {
            res.status(400).send("Invalid Details")
        }
    })
})

module.exports = router