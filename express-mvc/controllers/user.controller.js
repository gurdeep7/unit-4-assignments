const express = require("express")

const user = require("../model/user.model")

const router = express.Router()

const User = user.find().lean().exec()

router.get("", async(req,res)=>{

    try{
    const User =await user.find().lean().exec()

    res.status(201).send(User)
    }catch(e){
        res.status(500).json({status: e.message})
    }

})
router.post("", async(req,res)=>{

    try{
    const User = await user.create(req.body)

    res.status(201).send(User)
    }catch(e){
        res.status(500).json({status: e.message})
    }

})

router.patch("/user/:id", async(req,res)=>{

    try{
    const User = await user.findByIdAndUpdate(req.params.id,req.body).lean().exec()

    res.status(201).send(User)
    }catch(e){
        res.status(500).json({status: e.message})
    }

})

router.delete("/user/:id", async(req,res)=>{

    try{
    const User =await user.findByIdAndRemove(req.params.id).lean().exec()

    res.status(201).send(User)
    }catch(e){
        res.status(500).json({status: e.message})
    }

})

module.exports = router