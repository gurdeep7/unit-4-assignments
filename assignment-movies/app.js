
const express = require("express")

const mongoose = require("mongoose")

const connect = () =>{
    return mongoose.connect("mongodb://127.0.0.1:27017/movie")
}

const moviesSchema = new mongoose.Schema({
    id : {type: Number, required:true, unique: true},

    movie_name : {type: String, required: true},

    movie_genre : {type: String, required: false},

    year:{type: Number, required:true},

    budget:{type:Number, required: true}
},{
    versionKey:false,
    timestamps:true
})
  
const movie = mongoose.model("movie", moviesSchema)

const app = express()

app.use(express.json())

app.post("/movies",async(req,res)=>{
try{
    const Movie = await movie.create(req.body)

    res.status(201).send(Movie);
}catch (err){
    res.status(500).json({status: err.message})
}
})

app.get("/", async(req,res)=>{
try {
    const Movie = await movie.find().lean().exec();

    res.status(201).send(Movie);
} catch (err) {
    res.status(500).json({status: err.message});
}
});

app.get("/movies:id", async(req,res)=>{
    try {
        const Movie = await movie.find({id:{$eq:req.params.id}}).lean().exec();
    
        res.status(201).send(Movie);
    } catch (err) {
        res.status(500).json({status: err.message});
    }
    });

app.patch("/movies/:id", async(req,res)=>{
try{
    const Movie = await movie.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
    res.status(201).send(Movie);
} catch (err) {
    res.status(500).json({status: err.message});
}
})

app.delete("/movies/:id", async(req,res)=>{
    try{
        const Movie = await movie.findByIdAndDelete(req.params.id).lean().exec()
        res.status(201).send(Movie);
    } catch (err) {
        res.status(500).json({status: err.message});
    }
    })
    
app.listen(2345, async function(){
await connect()
console.log("Listening to port number 2345")
}) 

