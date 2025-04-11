
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const HomePage = () => {
  useEffect(() => {
    document.title = "Home | ComuChat";
  }, []);

  const { isAuthenticated } = useAuth();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to ComuChat</h1>
          <p className="text-xl text-muted-foreground">
            Connect with communities that share your interests and passions.
          </p>

          {!isAuthenticated && (
            <div className="mt-6 flex flex-wrap gap-4">
              <Link to="/login">
                <Button className="bg-community-purple hover:bg-community-darkPurple">
                  Log In
                </Button>
              </Link>
              <Link to="/login?register=true">
                <Button variant="outline" className="border-community-purple text-community-purple hover:bg-community-purple/10">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Join Communities</CardTitle>
              <CardDescription>
                Connect with like-minded individuals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Find and join communities that match your interests, hobbies, and passions.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Explore Communities</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Share Your Thoughts</CardTitle>
              <CardDescription>
                Post content and engage in discussions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Share ideas, ask questions, and participate in meaningful conversations.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Create a Post</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Connect Safely</CardTitle>
              <CardDescription>
                Your safety is our priority
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>We provide tools and resources to ensure a safe and positive experience for all users.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Safety Resources</Button>
            </CardFooter>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Featured Communities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((id) => (
              <Link key={id} to={`/community/${id}`} className="block">
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader>
                    <CardTitle>Community {id}</CardTitle>
                    <CardDescription>A vibrant community for everyone</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Join thousands of members in discussions about topics that matter.</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
