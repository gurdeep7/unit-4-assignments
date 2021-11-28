const express = require("express")

const mongoose = require("mongoose")

const connect = () =>{
    return mongoose.connect("mongodb://127.0.0.1:27017/books")
}

const app = express()

app.use(express.json())

const userSchema = new mongoose.Schema({
    first_name : {type: String, required: true},
    last_name: {type: String, required:true},
    
},{
    versionKey:false,
    timestamps:true
})
 
const user = mongoose.model("user",userSchema)

const sectionSchema = new mongoose.Schema({
    name: {type: String, required:true, unique: true}
},{
    versionKey:false,
    timestamps:true
})

const checked_inSchema =  new mongoose.Schema({
    user_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    book_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"book",
        required: true
    }
},{
    versionKey:false,
    timestamps:true
})


const checked_in= mongoose.model("checked_in",checked_inSchema)

const checked_outSchema =  new mongoose.Schema({
    user_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    book_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"book",
        required: true
    }
},{
    versionKey:false,
    timestamps:true
})


const checked_out= mongoose.model("checked_out",checked_outSchema)

const section = mongoose.model("section",sectionSchema)

const authorsSchema = new mongoose.Schema({
    first_name : {type: String, required: true},
    last_name: {type: String, required:true}
},{
    versionKey:false,
    timestamps:true
})  

const author = mongoose.model("author",authorsSchema)

const booksSchema = new mongoose.Schema({
    name: {type: String, required:true},
    section_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "section",
        required: true,
    },
    author_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "author",
        required:true,
    }
},{
    versionKey:false,
    timestamps:true
})

const book = mongoose.model("book",booksSchema)


app.post("/section",async (req,res)=>{
    try{
        const Section = await section.create(req.body)

        res.status(201).send(Section)
    }catch(err){
        res.status(500).json({status:err.message})
    }
})

app.post("/author",async (req,res)=>{
    try{
        const Author = await author.create(req.body)
        
        res.status(201).send(Author)
    }catch(err){
        res.status(500).json({satus:err.message})
    }
})

app.post("/user",async (req,res)=>{
    try{
        const User = await user.create(req.body)
        
        res.status(201).send(User)
    }catch(err){
        res.status(500).json({satus:err.message})
    }
})

app.post("/book", async (req,res)=>{

    try{
        const Book = await book.create(req.body)

        res.status(201).send(Book)
    }catch(err){
        res.status(500).json({satus:err.message})
    }
})

app.post("/books/checkin", async (req,res)=>{

    try{
        const Checked_in = await checked_in.create(req.body)

        res.status(201).send(Checked_in)
    }catch(err){
        res.status(500).json({satus:err.message})
    }
})

app.post("/books/checkout", async (req,res)=>{

    try{
        const Checked_out = await checked_out.create(req.body)

        res.status(201).send(Checked_out)
    }catch(err){
        res.status(500).json({satus:err.message})
    }
})
//CRUD Operations
app.post("/book", async (req,res)=>{

    try{
        const Book = await book.create(req.body)

        res.status(201).send(Book)
    }catch(err){
        res.status(500).json({satus:err.message})
    }
})

app.get("/books",async (req,res)=>{
   try{
       const Books = await book.find().populate("section_id").populate("author_id").lean().exec()
       res.status(201).send(Books)
   }catch(err){
       res.status(500).json({satus:err.message})
   }
})

app.patch("/book/:id", async (req,res)=>{

    try{
        const Book = await book.findByIdAndUpdate(req.params.id,req.body).lean().exec()

        res.status(201).send(Book)
    }catch(err){
        res.status(500).json({satus:err.message})
    }
})

app.delete("/book/:id", async (req,res)=>{

    try{
        const Book = await book.findByIdAndRemove(req.params.id).lean().exec()

        res.status(201).send(Book)
    }catch(err){
        res.status(500).json({satus:err.message})
    }
})

app.get("/books/checkin", async(req,res)=>{
    try{
        const Checked_in = await checked_in.find().populate("user_id").populate("book_id").lean().exec()
        res.status(201).send(Checked_in)
    }catch(err){
        res.status(500).json({status:err.message})
    }
})

app.get("/books/checkout", async(req,res)=>{
    try{
        const Checked_out = await checked_out.find().populate("user_id").populate("book_id").lean().exec()
        res.status(201).send(Checked_out)
    }catch(err){
        res.status(500).json({status:err.message})
    }
})
app.get("/books/:id/author",async(req,res)=>{
    try{
        const Author = await author.findById(req.params.id).lean().exec()
        
        const Books = await book.find({author_id:Author._id}).lean().exec()
        res.status(201).send(Books)
    }catch(err){
        res.status(500).json({status:err.message})
    }
})

app.get("/books/:id/section",async(req,res)=>{
    try{
        const Books = await book.find({section_id:req.params.id}).populate("author_id").populate("author_id").lean().exec()
        res.status(201).send(Books)
    }catch(err){
        res.status(500).json({status:err.message})
    }
})

app.get("/books/:id/notcheckedout",async(req,res)=>{
    try{
        const Checked_out = await checked_out.find().lean().exec()

        const Section = await section.findById(req.params.id).lean().exec()

        const Books = await book.find({setion_id:Section._id}).lean().exec()
        console.log(Checked_out[0].book_id, Books[0]._id)
        const result = Books.filter(item => (JSON.stringify(item._id) != JSON.stringify(Checked_out[0].book_id))
        
        )
        res.status(201).send(result)
    }catch(err){
        res.status(500).json({status:err.message})
    }
})
app.get("/book/:author_id/author/:section_id/section",async(req,res)=>{

    try{
        const Books =  await book.find({section_id:req.params.section_id,author_id:req.params.author_id}).lean().exec()

        res.status(201).send(Books)
    }catch(err){
        res.status(500).json({status:err.message})
  
    }
    
})

app.listen(2345, async function(){

    await connect()
    console.log("Listening on port 2345")
})

