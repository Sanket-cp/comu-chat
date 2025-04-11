
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Award, Crown, Rocket, ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Simulate usage percentage - in a real app this would come from your backend
  const usagePercentage = parseInt(localStorage.getItem("usagePercentage") || "0");
  const membershipPlan = "Basic"; // This would come from your backend in a real app

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
  
  const goToMembership = () => {
    navigate("/membership");
    toast({
      title: "Checking membership options",
      description: "Explore our premium plans to unlock more features!"
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
                    <p className="font-medium">{membershipPlan} (Free)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crown className="h-5 w-5 text-community-purple mr-2" />
                  Membership Status
                </CardTitle>
                <CardDescription>
                  Your current plan and benefits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold flex items-center">
                      <ShieldCheck className="h-4 w-4 mr-2 text-community-purple" />
                      Basic Plan
                    </h3>
                    <span className="text-sm text-muted-foreground">Current Plan</span>
                  </div>
                  
                  <div className="space-y-3 my-4">
                    <div className="flex justify-between text-sm">
                      <span>Usage Limit</span>
                      <span className="font-medium">{usagePercentage}%</span>
                    </div>
                    <Progress value={usagePercentage} className="h-2" />
                    {usagePercentage > 70 && (
                      <p className="text-sm text-amber-600 dark:text-amber-400">
                        You're approaching your free plan limit
                      </p>
                    )}
                  </div>
                  
                  <ul className="text-sm space-y-1 mb-4">
                    <li>• Join up to 5 communities</li>
                    <li>• Standard chat features</li>
                    <li>• Basic AI assistance</li>
                  </ul>
                </div>
                
                {usagePercentage > 50 && (
                  <div className="p-4 bg-community-purple/10 border border-community-purple/20 rounded-lg">
                    <div className="flex items-start">
                      <Award className="h-6 w-6 text-community-purple mr-3 mt-1" />
                      <div>
                        <h4 className="font-medium mb-1">Recommended Upgrade</h4>
                        <p className="text-sm mb-3">Upgrade to Premium to unlock unlimited communities and premium features.</p>
                        <Button 
                          onClick={goToMembership}
                          className="w-full bg-community-purple hover:bg-community-darkPurple"
                        >
                          <Rocket className="h-4 w-4 mr-2" />
                          View Premium Plans
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={goToMembership} 
                  className="w-full bg-community-purple hover:bg-community-darkPurple"
                >
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
