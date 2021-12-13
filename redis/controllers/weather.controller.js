const express = require("express");
const redis = require("../config/redis");
const router = express.Router();

const weatherForecast = require("../modals/weather.model")

router.get("", async(req,res)=>{
    try{redis.get("weather_forecasts",async function(err,forecasts){
        if(err) console.log(err);

        if(forecasts) return res.status(200).send(JSON.parse(forecasts))

        const forecast = await weatherForecast.find().lean().exec()

        redis.set("weather_forecasts", JSON.stringify(forecast))

    return res.status(200).json({db_forecast:forecast})
    }) }catch(e){
        res.status(500).json({status: e.message})
    }
})


router.post("", async(req,res)=>{
    
try{
        const forecast = await weatherForecast.create(req.body)

        const forecasts = await weatherForecast.find().lean().exec()

        redis.set("weather_forecasts", JSON.stringify(forecast))

    return res.status(200).send(forecast)
}catch(e){
    res.status(500).json({status: e.message})
}
    
})
module.exports = router