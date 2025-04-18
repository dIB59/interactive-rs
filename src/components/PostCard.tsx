import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BlogPost {
  id?: number;
  title: string;
  content: string;
}

const PostCard: React.FC<BlogPost> = ({ id, title, content }) => (
  <Card key={id} className="shadow-md hover:shadow-lg transition-shadow">
    <CardHeader>
      <CardTitle className="text-xl text-gray-800">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">{content}</p>
    </CardContent>
  </Card>
);

export default PostCard;
