const express = require("express")

const user = require("../models/user.model")

const router = express.Router()

const {body, validatonResults} = require("express-validator")

router.post("/",body("first_name").notEmpty(),async (req,res)=>{
    const errors = validationResult(req);
    try{
    const User = await user.create(req.body)
    res.status(201).send(User)
    }catch(e){
        res.status(500).json({status: e.message})
    }
})