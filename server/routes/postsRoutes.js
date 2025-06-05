const express = require("express");
const router = express.Router();
const {
  getAllposts,
  getAllMyPosts,
  createPost,
  getOnePost,
  updatePost,
  deletePost,
  getRandomPosts,
} = require("../controllers/postsController.js");
const authenticate = require("../middlewares/authMiddleware.js");

router.get("/", getAllposts);
router.post("/", authenticate, createPost);
router.get("/random", authenticate, getRandomPosts);
router.get("/myposts", authenticate, getAllMyPosts);

router.get("/:id", authenticate, getOnePost);
router.put("/:id", authenticate, updatePost);
router.delete("/:id", authenticate, deletePost);

module.exports = router;
