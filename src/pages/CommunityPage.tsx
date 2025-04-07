
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Info, 
  MessageSquare, 
  Settings, 
  Share2, 
  Users,
  FileText,
  Video
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ChatInterface from "@/components/ChatInterface";
import { Separator } from "@/components/ui/separator";
import PostFeed from "@/components/PostFeed";
import ShareDialog from "@/components/ShareDialog";
import { useToast } from "@/hooks/use-toast";
import CommunitySettings from "@/components/CommunitySettings";

// Demo community data
const communities = [
  {
    id: 1,
    name: "Music Lovers",
    icon: "🎵",
    description: "A community for sharing and discussing all genres of music. From classical to rock, jazz to hip-hop, we cover it all! Join us to discover new artists, share your favorite tracks, and connect with fellow music enthusiasts.",
    memberCount: 2478,
    tags: ["Music", "Entertainment", "Arts"],
    createdAt: "January 2023",
    creator: "Alex Turner",
    rules: [
      "Be respectful to all members",
      "No self-promotion without permission",
      "Use appropriate channels for discussions",
      "No hate speech or harassment"
    ]
  },
  {
    id: 2,
    name: "Foodies United",
    icon: "🍔",
    description: "For those passionate about cooking, eating, and exploring new cuisines. Share recipes, restaurant recommendations, and food photos!",
    memberCount: 1853,
    tags: ["Food", "Cooking", "Restaurants"],
    createdAt: "March 2023",
    creator: "Jamie Oliver",
    rules: [
      "Be respectful to all members",
      "No self-promotion without permission",
      "Use appropriate channels for discussions",
      "No hate speech or harassment"
    ]
  },
  {
    id: 3,
    name: "Tech Talk",
    icon: "💻",
    description: "Stay updated with the latest in technology. Discuss gadgets, programming, AI, and tech industry news.",
    memberCount: 3542,
    tags: ["Technology", "Programming", "AI"],
    createdAt: "November 2022",
    creator: "Ada Lovelace",
    rules: [
      "Be respectful to all members",
      "No self-promotion without permission",
      "Use appropriate channels for discussions",
      "No hate speech or harassment"
    ]
  },
  // Add more communities as needed
];

// Sample posts for demo
const samplePosts = [
  {
    id: 1,
    author: {
      name: "Alex Turner",
      initials: "AT",
    },
    content: "Just discovered this amazing jazz album from the 70s. Anyone else into vintage jazz? Would love some recommendations!",
    createdAt: "2025-04-05T14:30:00Z",
    likes: 24,
    comments: 7,
  },
  {
    id: 2,
    author: {
      name: "Maria Rodriguez",
      initials: "MR",
    },
    content: "Hey everyone! I'm organizing a virtual concert next week. We'll be featuring indie artists from around the world. Drop a comment if you're interested in performing or attending!",
    createdAt: "2025-04-04T09:15:00Z",
    likes: 42,
    comments: 15,
  },
  {
    id: 3,
    author: {
      name: "Jamie Oliver",
      initials: "JO",
    },
    content: "What's on your playlist this weekend? I'm looking for some fresh tracks to add to mine.",
    createdAt: "2025-04-03T18:45:00Z",
    likes: 18,
    comments: 23,
  }
];

const CommunityPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const communityId = parseInt(id || "1");
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isMember, setIsMember] = useState(false);
  
  // Find the community by ID
  const community = communities.find(c => c.id === communityId) || communities[0];
  
  const handleJoinCommunity = () => {
    setIsMember(!isMember);
    toast({
      title: isMember ? "Left community" : "Joined community!",
      description: isMember ? 
        `You have left the ${community.name} community` : 
        `Welcome to the ${community.name} community!`,
    });
  };

  return (
    <div className="container max-w-7xl py-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Community Header */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{community.icon}</div>
              <div>
                <h1 className="text-2xl font-bold">{community.name}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{community.memberCount} members</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                className={isMember ? "bg-red-500 hover:bg-red-600" : "bg-community-purple hover:bg-community-darkPurple"}
                onClick={handleJoinCommunity}
              >
                {isMember ? "Leave Community" : "Join Community"}
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setIsShareDialogOpen(true)}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Community Content */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full justify-start bg-white dark:bg-gray-800 border">
            <TabsTrigger value="posts" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center">
              <Video className="h-4 w-4 mr-2" />
              Video Call
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center">
              <Info className="h-4 w-4 mr-2" />
              About
            </TabsTrigger>
            <TabsTrigger value="members" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Members
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="border rounded-lg p-6">
            <PostFeed communityId={community.id} initialPosts={samplePosts} />
          </TabsContent>
          
          <TabsContent value="chat" className="border rounded-lg overflow-hidden h-[calc(100vh-300px)]">
            <ChatInterface 
              communityId={community.id} 
              communityName={community.name}
            />
          </TabsContent>
          
          <TabsContent value="video" className="border rounded-lg p-6">
            <div className="flex flex-col items-center justify-center py-12">
              <Video className="h-16 w-16 text-community-purple mb-4" />
              <h2 className="text-2xl font-bold mb-2">Start a Video Call</h2>
              <p className="text-center text-gray-600 mb-6 max-w-md">
                Connect face-to-face with other community members through video calls.
              </p>
              <Button className="bg-community-purple hover:bg-community-darkPurple">
                Start Group Call
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="about">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg border space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">About this Community</h2>
                  <p className="text-gray-600 dark:text-gray-300">{community.description}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Community Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {community.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-community-softGray text-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Community Rules</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    {community.rules.map((rule, index) => (
                      <li key={index} className="text-gray-600 dark:text-gray-300">{rule}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border h-fit">
                <h3 className="text-lg font-medium mb-4">Community Info</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p>{community.createdAt}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Creator</p>
                    <p>{community.creator}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Members</p>
                    <p>{community.memberCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="members">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-6">Community Members</h2>
              <p className="text-gray-500">Member listing functionality will be implemented in future updates.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <CommunitySettings community={community} />
          </TabsContent>
        </Tabs>
      </div>
      
      <ShareDialog 
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        communityName={community.name}
        communityId={community.id}
      />
    </div>
  );
};

export default CommunityPage;
