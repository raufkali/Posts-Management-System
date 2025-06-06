const Posts = require("../models/Posts");

const sendError = (message, status, next) => {
  const err = new Error(message);
  err.status = status;
  next(err);
};

// Get all posts of the logged-in user
const getAllposts = async (req, res, next) => {
  try {
    const posts = await Posts.find().populate("userId", "fullname");
    if (!posts || posts.length === 0) {
      sendError("No posts found", 404, next);
      return;
    }
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
// Get all my posts
const getAllMyPosts = async (req, res, next) => {
  try {
    const posts = await Posts.find({ userId: req.user.userId });
    if (!posts || posts.length === 0) {
      sendError("No posts found", 404, next);
      return;
    }
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
// get posts of all other users
const getRandomPosts = async (req, res, next) => {
  try {
    const posts = await Posts.find({
      userId: { $ne: req.user.userId },
    }).populate("userId", "fullname");

    if (!posts || posts.length === 0) {
      sendError("No posts found", 404, next);
      return;
    }
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

//  Create a new post
const createPost = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      sendError("Title is required", 400, next);
      return;
    }

    // Check if file was uploaded
    const imageUrl = req.file ? req.file.path : null;

    const newPost = await Posts.create({
      title,
      description,
      imageUrl, // save image path in DB
      userId: req.user.userId,
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    next(error);
  }
};

//  Get a single post by ID
const getOnePost = async (req, res, next) => {
  try {
    const post = await Posts.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!post) {
      sendError("Post not found", 404, next);
      return;
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

//  Update a post by ID
const updatePost = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const updatedPost = await Posts.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      sendError("Post not found or update failed", 404, next);
      return;
    }

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a post by ID
const deletePost = async (req, res, next) => {
  try {
    const deletedPost = await Posts.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!deletedPost) {
      sendError("Post not found or deletion failed", 404, next);
      return;
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllposts,
  getAllMyPosts,
  createPost,
  getOnePost,
  updatePost,
  deletePost,
  getRandomPosts,
};
