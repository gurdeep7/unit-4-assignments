const mongoose = require("mongoose")

const evaluationSchema = new mongoose.Schema({
    topic:{type:String, required:true},
    date:{type:String, required:true},
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    studentMarks:[{
        student_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        marks:{
            type:Number,
            required:true
        }
    }]
    
})

const evaluation = mongoose.model("evaluation",evaluationSchema)

module.exports = evaluation