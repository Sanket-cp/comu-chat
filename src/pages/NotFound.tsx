
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
      <div className="text-center animate-fade-in">
        <h1 className="text-9xl font-bold bg-gradient-to-r from-community-indigo via-community-brightPurple to-community-neonPink text-transparent bg-clip-text animate-gradient-shift">404</h1>
        <div className="mt-4 mb-8">
          <h2 className="text-3xl font-bold mb-2 text-foreground">Page Not Found</h2>
          <p className="text-xl text-muted-foreground mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-muted-foreground">
            Path: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => navigate(-1)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Go Back
          </Button>
          <Link to="/">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
