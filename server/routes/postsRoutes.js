const express = require("express");
const router = express.Router();
const {
  getAllposts,
  createPost,
  getOnePost,
  updatePost,
  deletePost,
  getRandomPosts,
} = require("../controllers/postsController.js");
const authenticate = require("../middlewares/authMiddleware.js");

router.get("/", authenticate, getAllposts);
router.post("/", authenticate, createPost);
router.get("/random", authenticate, getRandomPosts);

router.get("/:id", authenticate, getOnePost);
router.put("/:id", authenticate, updatePost);
router.delete("/:id", authenticate, deletePost);

module.exports = router;
