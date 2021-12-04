const express = require("express")

const router = express.Router()

const user = require("../models/user.model")

const admin = require("../models/admin.model")

const sendMail = require("../utils/send-mail")

router.post("",async function(req,res){
    try{
const User = await user.create(req.body)
const Admin = await admin.find({},{email:1}).lean().exec()
let array = []
Admin.forEach(({email}) => {
    array.push(email)
});
sendMail("noreply@masaischool.com",
 User.email,
 `Welcome to ABC system ${User.first_name} ${User.last_name}`,
 `Hi ${User.first_name} Confirm your email`,
 `Hi ${User.first_name} Confirm your email`
 )

 sendMail("noreply@masaischool.com",
 array,
 `${User.first_name} ${User.last_name} has regitered with us`,
 `Please welcome ${User.first_name} ${User.last_name}`,
 `Please welcome ${User.first_name} ${User.last_name}`
 )
 
res.status(201).send(User)
    }catch(err){
res.status(500).json({error: true,status: err.message})
    }

})

router.get("",async function(req,res){
    try{

        const page = +req.query.page
        const size= +req.query.size
        const skip= (page -1) * size
const User = await user.find().skip(skip).limit(size).lean().exec()
const totalPages = Math.ceil(await user.find().countDocuments()/size)

res.status(201).json({User,totalPages})
    }catch(e){
        res.status(500).json({error: "true",status: e.message})
    }

})

module.exports = router