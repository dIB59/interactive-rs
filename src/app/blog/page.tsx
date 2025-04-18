"use client";

import { useState, useEffect } from "react";
import PostCard from "@/components/PostCard";
import NewPostForm from "@/components/NewPostForm";

interface BlogPost {
  id?: number;
  title: string;
  content: string;
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error("Failed to fetch posts");
        console.error(response);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false); // Update loading state after fetch
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostAdded = (newlyCreatedPost: BlogPost) => {
    setPosts((prevPosts) => [...prevPosts, newlyCreatedPost]);
  };

  return (
    <div className="min-h-screen bg-muted py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <NewPostForm onPostAdded={handlePostAdded} />

        <main className="mt-2 space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {loading ? "Loading posts..." : "Blog Posts"}
          </h2>
          {loading ? (
            <p className="text-gray-500 italic">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-500 italic">
              No posts yet. Be the first to add one!
            </p>
          ) : (
            posts.map((post) => <PostCard key={post.id} {...post} />)
          )}
        </main>
      </div>
    </div>
  );
};

export default BlogPage;
