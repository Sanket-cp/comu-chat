
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";

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
      description: communityDescription,
      memberCount: 1, // Starting with the creator as member
      createdAt: new Date().toISOString(),
      tags: [] // Empty tags array for future enhancement
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
    <div className="container py-10 max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="mr-3"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-community-indigo via-community-brightPurple to-community-neonPink text-transparent bg-clip-text">Create Your Community</h1>
      </div>

      <Card className="shadow-lg border-2 border-gray-100 dark:border-gray-800">
        <CardContent className="p-8">
          <div className="grid gap-8">
            <div className="grid gap-3">
              <Label htmlFor="community-icon" className="text-lg font-medium">Community Icon</Label>
              <Input 
                id="community-icon" 
                value={communityIcon}
                onChange={(e) => setCommunityIcon(e.target.value)}
                placeholder="Choose an emoji as icon"
                className="text-2xl p-6 h-auto"
              />
              <p className="text-sm text-muted-foreground">
                Choose an emoji that represents your community
              </p>
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="community-name" className="text-lg font-medium">Community Name</Label>
              <Input 
                id="community-name" 
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                placeholder="e.g. Music Lovers"
                className="p-6 h-auto text-lg"
              />
              <p className="text-sm text-muted-foreground">
                Choose a unique, descriptive name that will attract members
              </p>
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="community-description" className="text-lg font-medium">Description</Label>
              <Textarea
                id="community-description"
                value={communityDescription}
                onChange={(e) => setCommunityDescription(e.target.value)}
                placeholder="What's this community about? Who should join? What will members discuss?"
                rows={6}
                className="text-lg p-4 resize-y"
              />
              <p className="text-sm text-muted-foreground">
                Describe your community to help others understand its purpose and values
              </p>
            </div>
            
            <Button 
              onClick={handleCreateCommunity}
              size="lg"
              className="w-full mt-4 bg-gradient-to-r from-community-indigo to-community-brightPurple hover:from-community-indigo/90 hover:to-community-brightPurple/90 text-white text-lg p-6 h-auto"
            >
              Launch Community
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCommunityPage;
