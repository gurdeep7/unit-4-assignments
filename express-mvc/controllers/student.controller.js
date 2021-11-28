const express = require("express")

const student = require("../model/student.model")

const router = express.Router()

router.get("", async(req,res)=>{

    try{
    const Student = await student.find().populate("user_id").lean().exec()

    res.status(201).send(Student)
    }catch(e){
        res.status(500).json({status: e.message})
    }

})

router.post("", async(req,res)=>{

    try{
    const Student = await student.create(req.body)

    res.status(201).send(Student)
    }catch(e){
        res.status(500).json({status: e.message})
    }

})

router.patch("/:id", async(req,res)=>{

    try{
    const Student = await student.findByIdAndUpdate(req.params.id,req.body).lean().exec()

    res.status(201).send(Student)
    }catch(e){
        res.status(500).json({status: e.message})
    }

})

router.delete("/:id", async(req,res)=>{

    try{
    const Student = student.findByIdAndRemove(req.params.id).lean().exec()

    res.status(201).send(Student)
    }catch(e){
        res.status(500).json({status: e.message})
    }

})

module.exports = router;