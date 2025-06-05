"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/`);
      if (!res.ok) {
        console.error("Failed to fetch posts");
        return;
      }
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div className="row mb-3" key={post._id}>
            <div className="col-12 card border-0 shadow-sm">
              <div className="card-body">
                <h3 className="card-title">{post.title}</h3>
                <p className="card-text">{post.description}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
