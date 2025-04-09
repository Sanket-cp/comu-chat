
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageSquare, Share2, Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import ShareDialog from "@/components/ShareDialog";

interface Comment {
  id: number;
  author: {
    name: string;
    avatar?: string;
    initials: string;
  };
  content: string;
  createdAt: string;
}

interface PostCardProps {
  id: number;
  author: {
    name: string;
    avatar?: string;
    initials: string;
  };
  content: string;
  image?: string;
  createdAt: string;
  likes: number;
  comments: number;
  liked?: boolean;
}

const PostCard = ({ 
  id, 
  author, 
  content, 
  image, 
  createdAt, 
  likes, 
  comments: commentCount, 
  liked = false 
}: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const handleLike = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to like posts",
        variant: "destructive"
      });
      return;
    }

    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to comment",
        variant: "destructive"
      });
      return;
    }

    if (commentText.trim() && user) {
      const newComment = {
        id: Date.now(),
        author: {
          name: user.name,
          avatar: user.avatar,
          initials: user.name.substring(0, 2).toUpperCase(),
        },
        content: commentText,
        createdAt: new Date().toISOString(),
      };
      setComments([...comments, newComment]);
      setCommentText("");
      toast({
        title: "Comment added",
        description: "Your comment has been posted successfully",
      });
    }
  };

  const handleShare = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to share posts",
        variant: "destructive"
      });
      return;
    }
    setIsShareDialogOpen(true);
  };

  // Format content with line breaks
  const formattedContent = content.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      {i < content.split('\n').length - 1 && <br />}
    </span>
  ));

  return (
    <Card className="mb-4 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3 pt-4">
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
        <p className="whitespace-pre-line mb-3">{formattedContent}</p>
        
        {image && (
          <div className="mt-2 rounded-md overflow-hidden border">
            <img 
              src={image} 
              alt="Post attachment" 
              className="max-h-96 w-full object-contain" 
            />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t pt-3 flex justify-between pb-3">
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : ''}`}
          onClick={handleLike}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likeCount}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={toggleComments}
        >
          <MessageSquare className="h-4 w-4" />
          <span>{comments.length + commentCount}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </CardFooter>
      
      {showComments && (
        <div className="px-6 pb-4">
          <Separator className="mb-4" />
          
          <div className="space-y-4 mb-4">
            {comments.map(comment => (
              <div key={comment.id} className="flex space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.author.avatar} />
                  <AvatarFallback className="bg-community-purple text-white text-xs">
                    {comment.author.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted rounded-md p-2 px-3">
                    <div className="font-medium text-sm">{comment.author.name}</div>
                    <div className="text-sm">{comment.content}</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
            ))}
            
            {commentCount > 0 && comments.length === 0 && (
              <div className="text-sm text-muted-foreground text-center py-2">
                Loading previous comments...
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-community-purple text-white text-xs">
                {user?.name ? user.name.substring(0, 2).toUpperCase() : "GU"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 flex items-center space-x-2">
              <Textarea
                placeholder={isAuthenticated ? "Write a comment..." : "Log in to comment"}
                className="min-h-0 h-10 py-2 resize-none focus-visible:ring-community-purple"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={!isAuthenticated}
              />
              <Button 
                size="icon" 
                className="h-8 w-8 bg-community-purple hover:bg-community-darkPurple"
                onClick={handleAddComment}
                disabled={!isAuthenticated || !commentText.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <ShareDialog 
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        communityName={`Post by ${author.name}`}
        communityId={id}
        isPost={true}
      />
    </Card>
  );
};

export default PostCard;
