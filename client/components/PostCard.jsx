import React from "react";

const PostCard = ({ username, title, description }) => {
  return (
    <div className="col-3 m-2 bg-light card border-0">
      <p>{username}</p>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};

export default PostCard;
