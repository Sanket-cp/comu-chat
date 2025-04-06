
import { useState } from "react";
import PostCard from "@/components/PostCard";
import CreatePostForm from "@/components/CreatePostForm";

interface Post {
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

interface PostFeedProps {
  communityId: number;
  initialPosts: Post[];
}

const PostFeed = ({ communityId, initialPosts }: PostFeedProps) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handlePostSubmit = (content: string) => {
    const newPost: Post = {
      id: Date.now(),
      author: {
        name: "You",
        initials: "GU",
      },
      content,
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
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default PostFeed;
