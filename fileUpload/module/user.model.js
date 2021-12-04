const mongoose = require("mongoose")

const userSchema =new  mongoose.Schema({
    furst_name:{type:String, required:true}
})