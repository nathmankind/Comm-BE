const express = require("express");
const {
  createPost,
  getPosts,
  getOnePost,
  updatePost,
} = require("../../controllers/posts");
const router = express.Router();

// const Posts = require("../../models/posts");

// Create
// router.post("/", async (req, res) => {
//   const newPost = new Posts(req.body);
//   try {
//     const post = await newPost.save();
//     if (!post) throw Error("Something went wrong with the post");
//     res.status(200).json(post);
//   } catch {
//     res.status(400).json({ msg: error });
//   }
// });

// Get
// router.get("/", async (req, res) => {
//   try {
//     const posts = await Posts.find();
//     if (!posts) throw Error("No Items");
//     res.status(200).json(posts);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err });
//   }
// });

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:postId", getOnePost);
router.patch("/:postId", updatePost);

// Show one
// router.get("/:id", async (req, res) => {
//   try {
//     const post = await Posts.findById(req.params.id);
//     if (!post) throw Error("No Items");
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(400).json({ mesg: err });
//   }
// });

module.exports = router;
