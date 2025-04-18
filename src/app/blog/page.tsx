"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BlogPost {
  id?: number; // Assuming posts have an ID from the database
  title: string;
  content: string;
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [newPost, setNewPost] = useState<BlogPost>({ title: "", content: "" });

  // Fetch posts from the database
  useEffect(() => {
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
      }
    };

    fetchPosts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleAddPost = async () => {
    if (newPost.title && newPost.content) {
      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        });

        if (response.ok) {
          const createdPost = await response.json();
          setPosts([...posts, createdPost]);
          setNewPost({ title: "", content: "" });
        } else {
          console.error("Failed to add post");
          console.error(response);
        }
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-muted py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl text-center">
                Create New Post
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                name="title"
                placeholder="Enter post title"
                value={newPost.title}
                onChange={handleInputChange}
              />
              <Textarea
                name="content"
                placeholder="Write your content here..."
                value={newPost.content}
                onChange={handleInputChange}
                className="h-32 resize-none"
              />
              <Button className="w-full" onClick={handleAddPost}>
                Add Post
              </Button>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              All Posts
            </h2>
            {posts.length === 0 ? (
              <p className="text-gray-500 italic">
                No posts yet. Be the first to add one!
              </p>
            ) : (
              posts.map((post) => (
                <Card
                  key={post.id}
                  className="shadow-md hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{post.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
