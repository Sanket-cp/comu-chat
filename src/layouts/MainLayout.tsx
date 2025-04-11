import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CommunitySidebar from "@/components/CommunitySidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import SafetyButton from "@/components/SafetyButton";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Award, Crown, Home, ShieldCheck, CreditCard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isMembershipPage = location.pathname === "/membership";
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  // Simulate user approaching their usage limit - in a real app this would come from your backend
  const [usagePercentage, setUsagePercentage] = useState(0);
  
  useEffect(() => {
    document.title = "ComuChat | Community Social Platform";
    
    // Simulate usage increasing as user navigates through the app
    // In a real app, this would be based on actual usage data
    if (isAuthenticated) {
      const currentUsage = parseInt(localStorage.getItem("usagePercentage") || "0");
      if (currentUsage < 85) {
        const newUsage = Math.min(currentUsage + 10, 85);
        localStorage.setItem("usagePercentage", newUsage.toString());
        setUsagePercentage(newUsage);
      } else {
        setUsagePercentage(currentUsage);
      }
    }
  }, [location.pathname, isAuthenticated]);

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate("/");
  };

  const goToMembership = () => {
    navigate("/membership");
    toast({
      title: "Checking membership options",
      description: "Explore our premium plans to unlock more features!"
    });
  };

  const showUpgradeAlert = isAuthenticated && usagePercentage > 70 && !isMembershipPage;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-white to-community-softGray dark:from-gray-900 dark:to-gray-950">
        <CommunitySidebar />
        <div className="flex-1 w-full">
          <Navbar />
          {!isHomePage && (
            <div className="flex items-center justify-between gap-2 p-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-b">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goBack}
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goHome}
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </Button>
              </div>
              
              {isAuthenticated && !isMembershipPage && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-community-purple text-community-purple hover:bg-community-purple/10"
                    >
                      <Crown className="h-4 w-4 mr-1" />
                      Plans
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-3">
                      <div className="font-medium flex items-center">
                        <Award className="h-5 w-5 text-community-purple mr-2" />
                        Premium Plans Available
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Upgrade to Premium or Ultimate to unlock exclusive features and create more communities.
                      </p>
                      
                      {usagePercentage > 0 && (
                        <div className="space-y-1 mt-2">
                          <div className="flex justify-between text-xs">
                            <span>Current Usage</span>
                            <span className="font-medium">{usagePercentage}%</span>
                          </div>
                          <Progress value={usagePercentage} className="h-1.5" />
                        </div>
                      )}
                      
                      <Button 
                        onClick={goToMembership}
                        className="w-full bg-community-purple hover:bg-community-darkPurple"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        View Plans
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          )}
          
          {showUpgradeAlert && (
            <Alert className="m-3 border-community-purple/50 bg-community-purple/5">
              <ShieldCheck className="h-4 w-4 text-community-purple" />
              <AlertTitle className="text-community-purple">Approaching usage limit</AlertTitle>
              <AlertDescription className="flex justify-between items-center">
                <span>You've used {usagePercentage}% of your free plan limit.</span>
                <Button 
                  onClick={goToMembership} 
                  size="sm"
                  className="bg-community-purple hover:bg-community-darkPurple"
                >
                  Upgrade
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
          <main className="min-h-[calc(100vh-4rem)] animate-fade-in max-w-full">
            <Outlet />
          </main>
          <SafetyButton />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
