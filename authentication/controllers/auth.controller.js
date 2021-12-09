const user = require("../models/user.model")

const register = (req,res) =>{
try{
if(User){
    return res.status(400).json({
        status:"failed",
        message:"Please provide a different email address"
    });
}

User = await user.create(req.body)
    res.status(201).send("Register")

}
catch(e){
    return res.status(500).json({status: "faliled", message: e.message})
}
}

const login = (req,res)=>{
    res.status(201).send("login");
}