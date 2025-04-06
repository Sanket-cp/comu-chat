
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageSquare, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  id: number;
  author: {
    name: string;
    avatar?: string;
    initials: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  liked?: boolean;
}

const PostCard = ({ id, author, content, createdAt, likes, comments, liked = false }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-4 pt-4">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={author.avatar} />
            <AvatarFallback className="bg-community-purple text-white">
              {author.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{author.name}</div>
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="whitespace-pre-line">{content}</p>
      </CardContent>
      <CardFooter className="border-t pt-3 flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : ''}`}
          onClick={handleLike}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likeCount}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          <span>{comments}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
