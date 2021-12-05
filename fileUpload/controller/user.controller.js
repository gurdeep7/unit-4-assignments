
const express = require("express")


const user = require("../models/user.model")

const upload = require("../middleware/upload");
const { unlinkSync, fstat } = require("fs");

const router = express.Router()

router.post("/",upload.single("profileImage"), async(req,res)=>{
    try{
       const User =await user.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_img: req.file.path
        })
        res.status(201).send(User)
    }catch(e){
        res.status(500).json({status: e.message})
    }
})
router.patch("/:id",upload.single("profileImage"), async(req,res)=>{
    try{
       let del = await user.findById(req.params.id).lean().exec()
       const User =await user.findByIdAndUpdate(req.params.id,{
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_img: req.file.path
        }).lean().exec()
        unlinkSync(del.profile_img)
               res.status(201).send(User)
    }catch(e){
        res.status(500).json({status: e.message})
    }
})
module.exports = router