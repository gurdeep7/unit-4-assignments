const express = require("express")

const app = express()

const authors = require("./authors.json")

app.use(express.json())


const logger = (req,res,next) =>{

    console.log(req.method)

    next();

}

app.get("/",(req,res)=>{
  
    res.send(authors)
})

app.post("/books",(req,res)=>{

    const new_authors = [...authors,req.body]

    res.send(new_authors)
})

app.listen(2345,function(){
    console.log("listening on port 2345")
})