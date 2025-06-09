"use client";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
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
    <div className="container-fluid mt-4">
      <h2 className="text-center mb-4">All Posts</h2>

      {posts.length === 0 ? (
        <p className="text-center">No posts found.</p>
      ) : (
        <div className="row justify-content-center">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              username={post.userId?.fullname || "Unknown User"}
              title={post.title}
              likes={post.likes}
              description={post.description}
              imageUrl={post.imageUrl}
              createdAt={post.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
