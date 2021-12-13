const mongoose = require("mongoose")

const weatherSchema = new mongoose.Schema({
    city_name: {type: String, required:true},
    max_temperature:{type: Number, required:true},
    min_temperature: {type: Number, required: true},
    chances_of_rain:{type:Number, required: true},
    humidity:{type:Number, required: true}
},{
    versionKey:false,
    timestamps:true
})

module.exports = mongoose.model("weather_forecast",weatherSchema)