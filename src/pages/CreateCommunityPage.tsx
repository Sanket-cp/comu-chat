
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const CreateCommunityPage = () => {
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [communityIcon, setCommunityIcon] = useState("🌟");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Check if user is authenticated when component mounts
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in or register to create a community",
        variant: "destructive"
      });
      // Redirect to login page with a return URL
      navigate("/login?returnTo=/create-community");
    }
  }, [isAuthenticated, navigate, toast]);

  // If not authenticated, show nothing while redirecting
  if (!isAuthenticated) {
    return null;
  }

  const handleCreateCommunity = () => {
    // Validate inputs
    if (!communityName.trim()) {
      toast({
        title: "Name required",
        description: "Please provide a name for your community",
        variant: "destructive"
      });
      return;
    }

    // Create new community
    const newCommunity = {
      id: Date.now(), // Generate unique ID
      name: communityName.trim(),
      icon: communityIcon || "🌟",
      description: communityDescription
    };
    
    // Show success toast
    toast({
      title: "Community created",
      description: `${newCommunity.name} has been created successfully!`,
    });
    
    // Save the community to localStorage
    const storedCommunities = localStorage.getItem("communities") || "[]";
    const communities = JSON.parse(storedCommunities);
    communities.push(newCommunity);
    localStorage.setItem("communities", JSON.stringify(communities));
    
    // Navigate to the new community page
    navigate(`/community/${newCommunity.id}`);
  };

  return (
    <div className="container py-8 max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-community-indigo via-community-brightPurple to-community-neonPink text-transparent bg-clip-text">Create Community</h1>
      </div>

      <div className="bg-card border rounded-lg shadow-sm p-6">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="community-icon">Community Icon</Label>
            <Input 
              id="community-icon" 
              value={communityIcon}
              onChange={(e) => setCommunityIcon(e.target.value)}
              placeholder="Choose an emoji as icon"
              className="text-lg"
            />
            <p className="text-sm text-muted-foreground">
              Choose an emoji that represents your community
            </p>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="community-name">Community Name</Label>
            <Input 
              id="community-name" 
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              placeholder="e.g. Music Lovers"
            />
            <p className="text-sm text-muted-foreground">
              Choose a unique, descriptive name
            </p>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="community-description">Description</Label>
            <Textarea
              id="community-description"
              value={communityDescription}
              onChange={(e) => setCommunityDescription(e.target.value)}
              placeholder="What's this community about?"
              rows={4}
            />
            <p className="text-sm text-muted-foreground">
              Describe your community to help others understand its purpose
            </p>
          </div>
          
          <Button 
            onClick={handleCreateCommunity}
            className="w-full bg-gradient-to-r from-community-indigo to-community-brightPurple hover:from-community-indigo/90 hover:to-community-brightPurple/90 text-white"
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunityPage;
