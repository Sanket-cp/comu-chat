
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
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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
  const { toast } = useToast();
  const navigate = useNavigate();

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
              <Link to="/create-community">
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </Link>
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
