const {Schema,model} = require("mongoose")

const bcrypt = require("bcryptjs")

const userSchema = new Schema({
    email:{type:String, required:yes, unique:true},
    password:{type:String, required:yes}

})

userSchema.pre("save",(next)=>{
    if(!this.isModified("password")) return next();
    bcrypt.genSalt(10, function(err,salt){
        bcrypt.hash(this.password,salt,function(err,hash){
            this.password = hash;
            return next()
        })
    })
})

const user = model("user",userSchema)

module.exports= user