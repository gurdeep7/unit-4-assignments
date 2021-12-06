const app = require("./index")

const connect = require("./config/db")

app.listen(2346,async function(){
await connect()
console.log("Listening to 2346")
})