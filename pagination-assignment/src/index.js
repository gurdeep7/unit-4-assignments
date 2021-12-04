const express = require("express")

const app = express()

app.use(express.json())

const adminController = require("../controllers/admin.controller")

const userController = require("../controllers/user.controller")

app.use("/admin", adminController)

app.use("/user", userController)

module.exports = app

