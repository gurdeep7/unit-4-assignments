const mongoose = require("mongoose")

const userSchem = new mongoose.Schema({
    name:{type:String, required:yes},
    email:{type:String, required:yes},
    
})