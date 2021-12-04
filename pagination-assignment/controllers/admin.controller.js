const express = require("express")

const router = express.Router()

const admin = require("../models/admin.model")

router.post("",async function(req,res){
    try{
const Admin = await admin.create(req.body)

res.status(201).send(Admin)
    }catch(err){
res.status(500).json({error: "true",status: err.message})
    }

})

router.get("",async function(req,res){
    try{
const Admin = await admin.find().lean().exec()

res.status(201).send(Admin)
    }catch(e){
        res.status(500).json({error: "true", status: e.message})
    }

})

module.exports = router