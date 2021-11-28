const express = require("express")

const connect = require("./config/db")

const app = express()

app.use(express.json())

app.listen(2345, async function(){

    await connect()

    console.log("Listening on port 2345")
})

