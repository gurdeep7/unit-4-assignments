require("dotenv").config()

const jwt = require("jsonwebtoken")

const user = require("../models/signup.model")

const newToken = (User) =>{
    return jwt.sign({User: User}, process.env.JWT_ACCESS_KEY)
}

const register = async (req,res) =>{
try{

    let User = await user.findOne({email:req.body.email}).lean().exec()

if(User){
    return res.status(400).json({
        status:"failed",
        message:"Please provide a different email address"
    });
}

User = await user.create(req.body)

const token = newToken(user);

    res.status(201).json({User,token})

}
catch(e){
    res.status(500).json({status: "failed", message: e.message})
}
}


  


module.exports=register