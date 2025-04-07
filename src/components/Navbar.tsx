
import { Bell, Home, Menu, Search, Users, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/discover?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const handleQuickSearch = (term: string) => {
    navigate(`/discover?search=${encodeURIComponent(term)}`);
    setIsSearchOpen(false);
    toast({
      title: "Searching for communities",
      description: `Showing results for "${term}"`,
    });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <nav className="border-b bg-white dark:bg-gray-900 w-full sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <SidebarTrigger>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SidebarTrigger>
          </div>
          
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-community-purple rounded-md p-1">
              <Users className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight hidden md:inline-flex">
              ComuChat
            </span>
          </Link>
        </div>
        
        <div className="flex-1 mx-4 max-w-md hidden md:block">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10 bg-muted/50 border-none"
              placeholder="Search communities..."
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0">
              <Command>
                <CommandInput 
                  placeholder="Search communities..." 
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      e.preventDefault();
                      handleQuickSearch(searchQuery);
                    }
                  }}
                />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Popular searches">
                    <CommandItem onSelect={() => handleQuickSearch("Music")}>
                      🎵 Music
                    </CommandItem>
                    <CommandItem onSelect={() => handleQuickSearch("Food")}>
                      🍔 Food
                    </CommandItem>
                    <CommandItem onSelect={() => handleQuickSearch("Tech")}>
                      💻 Technology
                    </CommandItem>
                    <CommandItem onSelect={() => handleQuickSearch("Books")}>
                      📚 Books
                    </CommandItem>
                    <CommandItem onSelect={() => handleQuickSearch("Fitness")}>
                      🏋️ Fitness
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </DialogContent>
          </Dialog>
          
          <Link to="/membership">
            <Button variant="ghost" size="icon" className="relative">
              <Crown className="h-5 w-5 text-yellow-500" />
              <span className="absolute -top-1 -right-1 bg-community-purple text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                +
              </span>
            </Button>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                No new notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-community-purple text-white text-sm">
                      GU
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                  <Link to="/profile" className="flex items-center w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link to="/settings" className="flex items-center w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link to="/membership" className="flex items-center w-full">
                    Membership
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="default" 
              className="bg-community-purple hover:bg-community-darkPurple"
              onClick={handleLogin}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
