"use client";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      console.log(process.env.NEXT_PUBLIC_API_URL);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/`);
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
    <div className="container-fluid mt-4 flex-column">
      <div className="row text-center d-flex align-items-center justify-content-center">
        <h2>All Posts</h2>
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              username={post.userId.fullname}
              title={post.title}
              description={post.description}
            />
          ))
        )}
      </div>
    </div>
  );
}
