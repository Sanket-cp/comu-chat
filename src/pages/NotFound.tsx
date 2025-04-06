
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-community-purple">404</h1>
        <div className="mt-4 mb-8">
          <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
          <p className="text-xl text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link to="/">
          <Button className="bg-community-purple hover:bg-community-darkPurple">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
