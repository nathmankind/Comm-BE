const Post = require("../models/posts");

/**
 * @param {object} req
 * @returns {object} success message
 */

const createPost = async (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).send({
      message: "Title cannot be empty",
    });
  }
  if (!req.body.content) {
    return res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  const note = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    const data = await note.save();
    console.log(data);
    res.status(200).send({ message: "Succcess" });
  } catch (error) {
    console.log("Error:", error);
  }
};

/*
Get all posts in the DB
*/
const getPosts = async (req, res) => {
  console.log("Finding this idiot");

  try {
    const data = await Post.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getOnePost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const data = await Post.findById(postId);
    console.log(data);
    if (!data) {
      res.status(404).send({
        message: `Post with the id of ${postId} does not exist`,
      });
    }
    res.send(data);
  } catch (err) {
    throw Error("An error occured", err);
  }
};

const updatePost = async (req, res, next) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  try {
    const data = await Post.findByIdAndUpdate(postId, {
      title: title,
      content: content,
    });
    console.log(data);
    res.status(200).send({ message: "Updated Successfully", data: data });
  } catch (error) {
    res.status(500).send({ message: "An error occured", error: error });
    return next(error);
  }
};

const deletePost = async (req, res) => {
  // ===
};

module.exports = { createPost, getPosts, getOnePost, updatePost };
