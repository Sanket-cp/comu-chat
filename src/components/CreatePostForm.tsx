
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Image, Send } from "lucide-react";

interface CreatePostFormProps {
  onPostSubmit: (content: string) => void;
  communityId: number;
}

const CreatePostForm = ({ onPostSubmit, communityId }: CreatePostFormProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onPostSubmit(content);
      setContent("");
    }
  };

  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-4">
          <div className="flex items-start space-x-3">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-community-purple text-white">GU</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="Share something with the community..."
              className="flex-1 resize-none focus-visible:ring-community-purple"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter className="border-t pt-3 flex justify-between">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Image className="h-4 w-4 mr-2" />
            Add Image
          </Button>
          <Button 
            type="submit" 
            size="sm"
            disabled={!content.trim()}
            className="bg-community-purple hover:bg-community-darkPurple"
          >
            <Send className="h-4 w-4 mr-2" />
            Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreatePostForm;
