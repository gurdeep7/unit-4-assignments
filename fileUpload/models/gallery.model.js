const mongoose = require("mongoose")

const gallerySchema =new  mongoose.Schema({
    images:[{type:String, required:true}],
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    }
})

const gallery = mongoose.model("gallery",gallerySchema)

module.exports = gallery