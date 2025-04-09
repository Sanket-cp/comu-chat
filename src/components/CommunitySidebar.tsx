
import { PlusCircle, Settings, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from "@/components/ui/sidebar";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tooltip } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Demo communities for initial display
const initialCommunities = [
  { id: 1, name: "Music Lovers", icon: "🎵" },
  { id: 2, name: "Foodies United", icon: "🍔" },
  { id: 3, name: "Tech Talk", icon: "💻" },
  { id: 4, name: "Book Club", icon: "📚" },
  { id: 5, name: "Fitness Group", icon: "🏋️" },
  { id: 6, name: "Travel Enthusiasts", icon: "✈️" },
  { id: 7, name: "Art & Design", icon: "🎨" },
  { id: 8, name: "Gaming Hub", icon: "🎮" }
];

const CommunitySidebar = () => {
  const [communities, setCommunities] = useState(initialCommunities);
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [communityIcon, setCommunityIcon] = useState("🌟");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

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
    
    // Add to communities list
    setCommunities([...communities, newCommunity]);
    
    // Show success toast
    toast({
      title: "Community created",
      description: `${newCommunity.name} has been created successfully!`,
    });
    
    // Close the dialog
    setOpen(false);
    
    // Reset form
    setCommunityName("");
    setCommunityDescription("");
    setCommunityIcon("🌟");
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold">Communities</h2>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Profile</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link to="/profile">
                  <SidebarMenuButton>
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to="/settings">
                  <SidebarMenuButton>
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex justify-between items-center w-full pr-2">
              <span>My Communities</span>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a new community</DialogTitle>
                    <DialogDescription>
                      Create a community to connect with people who share your interests.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="community-icon">Community Icon</Label>
                      <Input 
                        id="community-icon" 
                        value={communityIcon}
                        onChange={(e) => setCommunityIcon(e.target.value)}
                        placeholder="Choose an emoji as icon"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="community-name">Name</Label>
                      <Input 
                        id="community-name" 
                        value={communityName}
                        onChange={(e) => setCommunityName(e.target.value)}
                        placeholder="e.g. Music Lovers"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="community-description">Description</Label>
                      <Textarea
                        id="community-description"
                        value={communityDescription}
                        onChange={(e) => setCommunityDescription(e.target.value)}
                        placeholder="What's this community about?"
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button onClick={handleCreateCommunity}>Create Community</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <ScrollArea className="h-[calc(100vh-250px)]">
              <SidebarMenu>
                {communities.map((community) => (
                  <SidebarMenuItem key={community.id}>
                    <Link to={`/community/${community.id}`}>
                      <SidebarMenuButton>
                        <span className="text-xl mr-1">{community.icon}</span>
                        <span>{community.name}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="flex justify-between">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/discover">
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Discover
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Discover new communities</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default CommunitySidebar;
