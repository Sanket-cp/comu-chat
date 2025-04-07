
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Image, Send, X, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface CreatePostFormProps {
  onPostSubmit: (content: string, image?: string) => void;
  communityId: number;
}

const CreatePostForm = ({ onPostSubmit, communityId }: CreatePostFormProps) => {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a post",
        variant: "destructive"
      });
      return;
    }

    if (content.trim() || selectedImage) {
      onPostSubmit(content, selectedImage || undefined);
      setContent("");
      setSelectedImage(null);
      toast({
        title: "Post created",
        description: "Your post has been published successfully"
      });
    }
  };

  const handleImageSelect = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to add images",
        variant: "destructive"
      });
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Image too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!isAuthenticated) {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6 pb-6 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <h3 className="text-lg font-medium">Join the conversation</h3>
            <p className="text-muted-foreground">Sign in to post and interact with the community</p>
            <Button className="bg-community-purple hover:bg-community-darkPurple mt-2" asChild>
              <Link to="/login">
                <LogIn className="h-4 w-4 mr-2" />
                Sign in to post
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-4">
          <div className="flex items-start space-x-3">
            <Avatar>
              <AvatarImage src={user?.avatar || ""} />
              <AvatarFallback className="bg-community-purple text-white">
                {user?.name ? user.name.substring(0, 2).toUpperCase() : "GU"}
              </AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="Share something with the community..."
              className="flex-1 resize-none focus-visible:ring-community-purple"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
            />
          </div>
          
          {selectedImage && (
            <div className="mt-3 relative">
              <img 
                src={selectedImage} 
                alt="Selected" 
                className="max-h-64 rounded-md object-contain mx-auto border" 
              />
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute top-2 right-2 h-6 w-6 rounded-full"
                type="button"
                onClick={removeSelectedImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </CardContent>
        <CardFooter className="border-t pt-3 flex justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-community-purple hover:bg-community-softGray"
            type="button"
            onClick={handleImageSelect}
          >
            <Image className="h-4 w-4 mr-2" />
            Add Image
          </Button>
          <Button 
            type="submit" 
            size="sm"
            disabled={!content.trim() && !selectedImage}
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
