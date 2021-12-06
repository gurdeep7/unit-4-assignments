const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    first_name:{type:String, required:false},
    last_name:{type:String, required:false},
    email:{type:String, required:false},
    pincode:{type:Number, required:false},
    age:{type:Number , required:false},
    gender:{type:String, required:false}
})

const user = mongoose.model("user",userSchema)

module.exports = user