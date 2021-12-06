const express = require("express")

const user = require("../models/user.model")

const router = express.Router()

const {body, validationResult} = require("express-validator")



router.post("/",
body("first_name").notEmpty().withMessage("First name is required"),
body("last_name").notEmpty().withMessage("Last name is required"),
body("email").isEmail().withMessage("Invalid Email"),
body("pincode").isNumeric().withMessage("Invalid Pin code").isLength(6).withMessage("pincode length must be 6 digits"),
body("age").isFloat({min:1, max:100}).withMessage("Invalid age"),
body("gender").custom((value)=>{
    
    if(value != "male" && value !="female" && value != "others"){
        throw new Error("Invalid Gender")
    }
    return true
}),
async (req,res)=>{
    const errors = validationResult(req);
    let newErrors = errors.array().map(({msg,param})=>{
       return {[param]:msg}
    })
    if(!errors.isEmpty()){
        return res.status(400).json({errors : newErrors})
    }
    try{
    const User = await user.create(req.body)
    res.status(201).send(User)
    }catch(e){
        res.status(500).json({status: e.message})
    }
})

module.exports = router