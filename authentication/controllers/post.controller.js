const express = require("express")

const post = require("../models/post.model")

const authenticate = require("../middleware/authentication")

const router = express.Router()

router.post("/", authenticate, async (req, res) => {
    try {
      const user = req.user;
  
      const Post = await post.create({
        title: req.body.title,
        user:req.body.user
      })
      return res.status(201).json({ Post });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  });

  router.get("/", authenticate, async (req, res) => {
    try {
      const user = req.user;
  
      const Post = await post.find().populate("user").lean().exec()
      return res.status(201).json({ Post });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  });

  module.exports = router;
  