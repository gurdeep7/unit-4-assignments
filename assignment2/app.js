const express = require("express")

const app = express()

const books = require("./books.json")

app.use(express.json())


const logger = (req,res,next) =>{
    req.name  = "Gurdeep Singh"

    
   next()
}

app.get("/",logger,(req,res)=>{
  
    res.send(books)
})

app.get("/books/:id",logger,(req,res)=>{
  
    const specifc_book = books.filter(books => books.id == req.params.id)

    var obj = {
        "api_requested_by" : req.name,
        "book" : specifc_book
    }
    res.send(obj)


})

app.patch("/books/:id",logger,(req,res)=>{

const new_books = books.map((book)=>{
   
if(+req.params.id == book.id){
    if(req?.body?.author) book.author = req.body.author
    if(req?.body?.publish_year) book.publish_year = req.body.publish_year

    return book
}
return book
})
var obj = {
    "api_requested_by" : req.name,
    "books" : new_books
}
res.send(obj)
})


app.post("/books",logger,(req,res)=>{

    const new_books = [...books,req.body]

    var obj = {
        "api_requested_by" : req.name,
        "books" : new_books
    }
    res.send(obj)
})


app.delete("/books:id",logger,(req,res)=>{
  
    const remaining_books = books.filter(books => books.id != req.params.id)

    var obj = {
        "api_requested_by" : req.name,
        "books" : remaining_books
    }
    res.send(obj)


})
app.listen(2345,function(){
    console.log("listening on port 2345")
})