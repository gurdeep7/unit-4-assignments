const express = require("express")

const weatherForecastController = require("./controllers/weather.controller")

const app = express()

app.use(express.json())

app.use("/weatherforecast", weatherForecastController)

module.exports = app