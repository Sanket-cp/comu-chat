
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted px-4">
      <div className="text-center animate-fade-in max-w-2xl">
        <h1 className="text-9xl font-bold bg-gradient-to-r from-community-indigo via-community-brightPurple to-community-neonPink text-transparent bg-clip-text animate-gradient-shift">404</h1>
        <div className="mt-4 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Page Not Found</h2>
          <p className="text-xl text-muted-foreground mb-4">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-muted-foreground p-2 bg-muted/50 rounded-lg inline-block max-w-full overflow-hidden text-ellipsis">
            Path: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto">
          <Button 
            onClick={() => navigate(-1)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            size="lg"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </Button>
          
          <Link to="/" className="sm:col-span-1">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10 w-full h-full flex items-center justify-center gap-2"
              size="lg"
            >
              <Home className="h-5 w-5" />
              Home
            </Button>
          </Link>
          
          <Link to="/discover" className="sm:col-span-1">
            <Button 
              variant="secondary" 
              className="w-full h-full flex items-center justify-center gap-2"
              size="lg"
            >
              <Search className="h-5 w-5" />
              Discover
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 p-4 bg-card border rounded-lg shadow-sm max-w-md mx-auto">
          <h3 className="font-medium mb-2">Popular Communities</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link to="/community/1">
              <Button variant="ghost" size="sm">🎵 Music Lovers</Button>
            </Link>
            <Link to="/community/3">
              <Button variant="ghost" size="sm">💻 Tech Talk</Button>
            </Link>
            <Link to="/community/8">
              <Button variant="ghost" size="sm">🎮 Gaming Hub</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
