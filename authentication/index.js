const express = require("express")

const register= require("./controllers/signup.controller")

const login = require("./controllers/signin.controller")

const post = require("./controllers/post.controller")

const app = express()

app.use(express.json())

app.post("/register",register)

app.post("/login",login)

app.use("/post",post)

module.exports = app