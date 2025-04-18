"use client";

import { useState } from "react";

interface BlogPost {
  title: string;
  content: string;
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [newPost, setNewPost] = useState<BlogPost>({ title: "", content: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleAddPost = () => {
    if (newPost.title && newPost.content) {
      setPosts([...posts, newPost]);
      setNewPost({ title: "", content: "" });
    }
  };

  const renderPosts = () => {
    if (posts.length === 0) {
      return (
        <p className="text-gray-500 italic">
          No posts yet. Be the first to add one!
        </p>
      );
    }

    return posts.map((post, index) => (
      <div
        key={index}
        className="mb-6 border border-gray-200 rounded-lg p-6 shadow-md bg-white hover:shadow-lg transition-shadow"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          {post.title}
        </h3>
        <p className="text-gray-600">{post.content}</p>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Blog
        </h1>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Create New Post
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Enter post title"
              value={newPost.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <textarea
              name="content"
              placeholder="Write your content here..."
              value={newPost.content}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-32 resize-none"
            />
            <button
              onClick={handleAddPost}
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Add Post
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            All Posts
          </h2>
          {renderPosts()}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
