const express = require("express")

const evaluation = require("../model/evaluation.model")

const student = require("../model/student.model")

const router = express.Router()

router.get("", async(req,res)=>{

    try{
    const Evaluation = await evaluation.find().populate("instructor").populate("studentMarks.student_id").lean().exec()

    res.status(201).send(Evaluation)
    }catch(e){
        res.status(500).json({status: e.message})
    }

})

router.post("", async(req,res)=>{

    try{
    const Evaluation = await evaluation.create(req.body)

    res.status(201).send(Evaluation)
    }catch(e){
        res.status(500).json({status: e.message})
    }

})

router.get("/highestMarks/:id",async(req,res)=>{

    try{
        const Eval = await evaluation.findById(req.params.id).lean().exec()

        const array = Eval.studentMarks

        const sortedArray = array.sort((a,b)=>{
            return b.marks-a.marks
        })

        var student_id = sortedArray[0].student_id
        const Student = await student.findById(student_id).populate("user_id").lean().exec()

        console.log(sortedArray[0].student_id)
        res.status(201).send(Student)
    }catch(e){
        res.status(500).json({status: e.message})
    }
})
router.patch("/:id", async(req,res)=>{

    try{
    const Evaluation = evaluation.findByIdAndUpdate(req.params.id,req.body).lean().exec()

    res.status(201).send(Evaluation)
    }catch(e){
        res.status(500).json({status: e.message})
    }

})

router.delete("/:id", async(req,res)=>{

    try{
    const Evaluation = await evaluation.findByIdAndRemove(req.params.id).lean().exec()

    res.status(201).send(Evaluation)
    }catch(e){
        res.status(500).json({status: e.message})
    }

})
module.exports = router;