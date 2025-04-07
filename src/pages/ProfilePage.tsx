
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Card>
              <CardContent className="pt-6 flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-community-purple text-white text-xl">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                
                <div className="w-full mt-6 space-y-2">
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full" 
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Your basic account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">April 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Membership</p>
                    <p className="font-medium">Basic (Free)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Membership Status</CardTitle>
                <CardDescription>
                  Your current plan and benefits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Basic Plan</h3>
                    <span className="text-sm text-muted-foreground">Current Plan</span>
                  </div>
                  <ul className="text-sm space-y-1 mb-4">
                    <li>• Join up to 5 communities</li>
                    <li>• Standard chat features</li>
                    <li>• Basic AI assistance</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-community-purple hover:bg-community-darkPurple">
                  Upgrade to Premium
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
