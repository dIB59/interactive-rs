"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  return (
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
            <div className="space-y-6">
              {posts.map((post, index) => (
                <Card
                  key={index}
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
