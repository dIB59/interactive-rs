import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BlogPost {
  title: string;
  content: string;
}

interface NewPostFormProps {
  onPostAdded: (newPost: BlogPost) => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onPostAdded }) => {
  const [newPost, setNewPost] = useState<BlogPost>({ title: "", content: "" });

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
          onPostAdded(createdPost); // Notify the parent component about the new post
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
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl text-center">Create New Post</CardTitle>
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
  );
};

export default NewPostForm;
