import React, { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaShareSquare,
  FaBookmark,
} from "react-icons/fa";

const PostCard = ({
  username,
  title,
  likes,
  description,
  imageUrl,
  createdAt,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes); // placeholder count
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const formattedDate = new Date(createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim()) {
      setComments([...comments, commentInput.trim()]);
      setCommentInput("");
    }
  };

  return (
    <div className="col-12 mx-auto my-3 card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <p className="fw-bold mb-0">{username}</p>
          <p className="text-muted small mb-0">{formattedDate}</p>
        </div>

        {imageUrl && (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
            alt={title}
            className="img-fluid rounded mb-3"
            style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
          />
        )}

        {/* Post Actions */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex gap-3">
            <span
              style={{ cursor: "pointer", color: liked ? "red" : "black" }}
              onClick={toggleLike}
            >
              {liked ? <FaHeart size={22} /> : <FaRegHeart size={22} />}
            </span>
            <FaRegComment size={22} style={{ cursor: "pointer" }} />
            <FaShareSquare size={22} style={{ cursor: "pointer" }} />
          </div>
          <FaBookmark size={22} style={{ cursor: "pointer" }} />
        </div>

        {/* Like Count */}
        <p className="mb-1 fw-bold">{likeCount} likes</p>

        {/* Post Content */}
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>

        {/* Comments List */}
        {comments.length > 0 && (
          <div className="mt-2">
            <p className="fw-bold mb-1">Comments</p>
            <ul className="list-unstyled mb-2">
              {comments.map((comment, index) => (
                <li
                  key={index}
                  className="mb-1 border-bottom pb-1 small text-muted"
                >
                  {comment}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Comment Input */}
        <form onSubmit={handleCommentSubmit} className="d-flex mt-2">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="form-control me-2"
            placeholder="Add a comment..."
          />
          <button type="submit" className="btn btn-sm btn-primary">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCard;
