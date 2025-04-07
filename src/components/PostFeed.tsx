
import { useState } from "react";
import PostCard from "@/components/PostCard";
import CreatePostForm from "@/components/CreatePostForm";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Post {
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

interface PostFeedProps {
  communityId: number;
  initialPosts: Post[];
}

const PostFeed = ({ communityId, initialPosts }: PostFeedProps) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handlePostSubmit = (content: string, image?: string) => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create posts",
        variant: "destructive"
      });
      return;
    }

    const newPost: Post = {
      id: Date.now(),
      author: {
        name: user.name,
        avatar: user.avatar,
        initials: user.name.substring(0, 2).toUpperCase(),
      },
      content,
      image,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      liked: false
    };

    setPosts([newPost, ...posts]);
  };

  return (
    <div>
      <CreatePostForm onPostSubmit={handlePostSubmit} communityId={communityId} />
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default PostFeed;
