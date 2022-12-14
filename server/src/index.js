const express = require('express')
const mongoose = require('mongoose')
const MemberModel = require('../models/Member')
const cors = require('cors')
require('dotenv').config()

const mongostring = process.env.DATABASE_URL

const port = 3000

const app = express()

app.use(express.json())
app.use(cors())

app.post('/insert', async (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const age = req.body.age
    const batch = req.body.batch
    const Member = new MemberModel({
        firstName: firstName,
        lastName: lastName,
        age: age,
        batch: batch
    }) 
    try {
        const dataToSave = await Member.save();
        res.status(200).json(dataToSave)
        res.send("inserted successfully")
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
app.get('/read', async (req, res) => {
    MemberModel.find({},(err, result) => {
        if (err) {
            res.send(err)
        } 
        res.send(result)
    })
})

app.listen(port, () => {
    console.log(`Server is listening`)
    // console.log(`Server is listening on http://localhost:${port}`)
})

mongoose.connect(mongostring, {useNewUrlParser:true})
const database = mongoose.connection

database.on('error', error => console.log(error));

database.once('connected', () => {
    console.log("Database connected")
})