
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
import { useState, useEffect } from "react";
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
import { useAuth } from "@/contexts/AuthContext";

// Popular search suggestions
const popularSearches = [
  { name: "Music Lovers", emoji: "🎵", term: "Music" },
  { name: "Foodies United", emoji: "🍔", term: "Food" },
  { name: "Tech Talk", emoji: "💻", term: "Technology" },
  { name: "Book Club", emoji: "📚", term: "Books" },
  { name: "Fitness Group", emoji: "🏋️", term: "Fitness" },
  { name: "Travel Enthusiasts", emoji: "✈️", term: "Travel" },
  { name: "Art & Design", emoji: "🎨", term: "Art" },
  { name: "Gaming Hub", emoji: "🎮", term: "Gaming" },
];

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState(popularSearches);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, logout } = useAuth();

  // Filter search suggestions based on query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = popularSearches.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.term.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchSuggestions(filtered);
    } else {
      setSearchSuggestions(popularSearches);
    }
  }, [searchQuery]);

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
    logout();
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
            {searchQuery.trim() && (
              <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border z-10">
                <ul className="py-2">
                  {searchSuggestions.map((item, index) => (
                    <li 
                      key={index}
                      className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center"
                      onClick={() => handleQuickSearch(item.term)}
                    >
                      <span className="mr-2">{item.emoji}</span>
                      <span>{item.name}</span>
                    </li>
                  ))}
                  {searchSuggestions.length === 0 && (
                    <li className="px-4 py-2 text-muted-foreground">No suggestions found</li>
                  )}
                </ul>
              </div>
            )}
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
                    {searchSuggestions.map((item, index) => (
                      <CommandItem key={index} onSelect={() => handleQuickSearch(item.term)}>
                        {item.emoji} {item.name}
                      </CommandItem>
                    ))}
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
          
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-community-purple text-white text-sm">
                      {user.name.slice(0, 2).toUpperCase()}
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
