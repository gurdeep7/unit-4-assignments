const mongoose = require("mongoose")

const userSchema =new  mongoose.Schema({
     first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    profile_img:{type:String, required:false}
})

const user = mongoose.model("user",userSchema)

module.exports = user