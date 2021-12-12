require("dotenv").config()

const jwt = require("jsonwebtoken")

const user = require("../models/signup.model")

const newToken = (User) =>{
    return jwt.sign({User: User}, process.env.JWT_ACCESS_KEY)
}



const login = async (req, res) => {
    try {
      // check if the email address provided already exist
      let User = await user.findOne({ email: req.body.email });
  
      // if it does not exist then throw an error
      if (!User)
        return res.status(400).json({
          status: "failed",
          message: " Please provide correct email address and password 1",
        });
  
      // else we match the password
      const match = await User.checkPassword(req.body.password);
  
      // if not match then throw an error
      if (!match)
        return res.status(400).json({
          status: "failed",
          message: " Please provide correct email address and password 2",
        });
  
      // if it matches then create the token
      const token = newToken(User);
  
      // return the user and the token
      res.status(201).json({ User, token });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  };
  


module.exports=login