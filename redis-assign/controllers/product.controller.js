const express = require("express");
const redis = require("../config/redis");
const router = express.Router();

const product = require("../modals/product.model")

router.get("", async(req,res)=>{
    try{redis.get("products",async function(err,forecasts){
        if(err) console.log(err);

        if(forecasts){
             return res.status(200).send(JSON.parse(forecasts))}

        const forecast = await product.find().lean().exec()

        redis.set("products", JSON.stringify(forecast))

    return res.status(201).json({db_forecast:forecast})
    }) }catch(e){
        res.status(500).json({status: e.message})
    }
})


router.post("", async(req,res)=>{
    
try{
        const forecast = await product.create(req.body)

        const forecasts = await product.find().lean().exec()

        redis.set("products", JSON.stringify())

    return res.status(200).send(forecast)
}catch(e){
    res.status(500).json({status: e.message})
}
    
})

router.get("/:id", async(req,res)=>{
    
    try{redis.get(`products.${req.params.id}`,async function(err,forecasts){
        if(err) console.log(err);

        if(forecasts){
             return res.status(200).send(JSON.parse(forecasts))}

        const forecast = await product.findById(req.params.id).lean().exec()

        redis.set(`products.${req.params.id}`, JSON.stringify(forecast))

    return res.status(201).json({db_forecast:forecast})
    }) }catch(e){
        res.status(500).json({status: e.message})
    }
})

router.patch("/:id",async (req,res)=>{
    const forecasts = await product.findByIdAndUpdate(req.params.id, req.body, {new:true})

    redis.set(`products.${req.params.id}`, JSON.stringify(forecasts))

    const forecast =await product.find().lean().exec()

    redis.set(`products`, JSON.stringify(forecast))
    res.status(200).send(forecasts)
})
router.delete("/:id",async (req,res)=>{
    const forecasts = await product.findByIdAndDelete(req.params.id, {new:true})

    redis.hmset(`products.${req.params.id}`, JSON.stringify(forecasts))

    const forecast =await product.find().lean().exec()

    redis.set(`products`, JSON.stringify(forecast))
    res.status(200).send(forecasts)
})
module.exports = router