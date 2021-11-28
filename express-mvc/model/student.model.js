const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    roll_no:{type:Number, required:true,unique:true},
    batch:{type:String, required:true},
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
},{
    versionKey:false,
    timestamps:true
})

const student = mongoose.model("student",studentSchema)

module.exports = student