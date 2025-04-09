
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageSquare, Share2, Send, Bot } from "lucide-react";
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

// Sample static comments for demo
const sampleComments: { [key: number]: Comment[] } = {
  1: [
    {
      id: 101,
      author: {
        name: "Maria Rodriguez",
        initials: "MR",
      },
      content: "I love jazz from that era! Check out Bill Evans Trio if you haven't already.",
      createdAt: "2025-04-06T10:15:00Z",
    },
    {
      id: 102,
      author: {
        name: "James Wilson",
        initials: "JW",
      },
      content: "John Coltrane's 'A Love Supreme' is my all-time favorite album from the 60s.",
      createdAt: "2025-04-06T11:30:00Z",
    }
  ],
  2: [
    {
      id: 201,
      author: {
        name: "David Chen",
        initials: "DC",
      },
      content: "This sounds amazing! I'd love to attend. What time is it happening?",
      createdAt: "2025-04-05T16:45:00Z",
    }
  ],
  3: [
    {
      id: 301,
      author: {
        name: "Sophia Garcia",
        initials: "SG",
      },
      content: "I've been listening to a lot of indie folk lately. I'd recommend Fleet Foxes!",
      createdAt: "2025-04-04T09:20:00Z",
    },
    {
      id: 302,
      author: {
        name: "Michael Brooks",
        initials: "MB",
      },
      content: "The new Radiohead album has been on repeat for me all week.",
      createdAt: "2025-04-04T14:05:00Z",
    }
  ]
};

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
  const [initialComments, setInitialComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  // Load initial comments when comments are shown
  useEffect(() => {
    if (showComments && initialComments.length === 0) {
      setLoadingComments(true);
      // In a real app, this would be an API call
      setTimeout(() => {
        setInitialComments(sampleComments[id] || []);
        setLoadingComments(false);
      }, 800);
    }
  }, [showComments, id, initialComments.length]);

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

  // Get AI suggestion for comment
  const getAISuggestion = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to use AI suggestions",
        variant: "destructive"
      });
      return;
    }

    setCommentText("I really enjoyed reading this! Thanks for sharing your thoughts.");
    
    toast({
      title: "AI Suggestion added",
      description: "You can edit the suggested comment before posting",
    });
  };

  // Format content with line breaks
  const formattedContent = content.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      {i < content.split('\n').length - 1 && <br />}
    </span>
  ));

  // All comments - combine initial (loaded) and user-added comments
  const allComments = [...initialComments, ...comments];

  return (
    <Card className="mb-4 overflow-hidden hover:shadow-md transition-shadow duration-200 card-hover animate-fade-in border-community-purple/10">
      <CardHeader className="pb-3 pt-4 bg-gradient-to-r from-white to-community-softGray dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center space-x-3">
          <Avatar className="ring-2 ring-offset-2 ring-community-purple/30 ring-offset-white dark:ring-offset-gray-900">
            <AvatarImage src={author.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-community-purple to-community-darkPurple text-white">
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
          <div className="mt-2 rounded-md overflow-hidden border border-community-purple/10 shadow-sm">
            <img 
              src={image} 
              alt="Post attachment" 
              className="max-h-96 w-full object-contain" 
            />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t pt-3 flex justify-between pb-3 bg-gradient-to-r from-white to-community-softGray/50 dark:from-gray-800 dark:to-gray-900/50">
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-1 ${isLiked ? 'text-pink-500' : ''} hover:bg-pink-50 dark:hover:bg-pink-900/20`}
          onClick={handleLike}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current animate-scale-in' : ''}`} />
          <span>{likeCount}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          onClick={toggleComments}
        >
          <MessageSquare className="h-4 w-4" />
          <span>{allComments.length}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1 hover:bg-green-50 dark:hover:bg-green-900/20"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </CardFooter>
      
      {showComments && (
        <div className="px-6 pb-4 bg-gradient-to-br from-white/50 to-community-softGray/30 dark:from-gray-800/50 dark:to-gray-900/30">
          <Separator className="mb-4" />
          
          <div className="space-y-4 mb-4">
            {allComments.length > 0 ? (
              allComments.map(comment => (
                <div key={comment.id} className="flex space-x-2 animate-fade-in">
                  <Avatar className="h-8 w-8 ring-1 ring-offset-1 ring-community-purple/20 ring-offset-white dark:ring-offset-gray-900">
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-community-purple to-community-darkPurple text-white text-xs">
                      {comment.author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-white dark:bg-gray-800 rounded-md p-2 px-3 shadow-sm border border-community-purple/10">
                      <div className="font-medium text-sm">{comment.author.name}</div>
                      <div className="text-sm">{comment.content}</div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              ))
            ) : loadingComments ? (
              <div className="text-sm text-muted-foreground text-center py-2">
                Loading comments...
              </div>
            ) : (
              <div className="text-sm text-muted-foreground text-center py-2">
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8 ring-1 ring-offset-1 ring-community-purple/20 ring-offset-white dark:ring-offset-gray-900">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-community-purple to-community-darkPurple text-white text-xs">
                {user?.name ? user.name.substring(0, 2).toUpperCase() : "GU"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 flex items-center space-x-2">
              <Textarea
                placeholder={isAuthenticated ? "Write a comment..." : "Log in to comment"}
                className="min-h-0 h-10 py-2 resize-none focus-visible:ring-community-purple border-community-purple/20"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={!isAuthenticated}
              />
              <div className="flex flex-col space-y-2">
                <Button 
                  size="icon" 
                  className="h-8 w-8 bg-gradient-to-r from-community-purple to-community-darkPurple hover:opacity-90"
                  onClick={handleAddComment}
                  disabled={!isAuthenticated || !commentText.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 border-community-purple/30 hover:bg-community-purple/10"
                  onClick={getAISuggestion}
                  disabled={!isAuthenticated}
                  title="Get AI suggestion"
                >
                  <Bot className="h-4 w-4 text-community-purple" />
                </Button>
              </div>
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
