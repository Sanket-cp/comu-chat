
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CommunitySidebar from "@/components/CommunitySidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect } from "react";
import SafetyButton from "@/components/SafetyButton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    document.title = "ComuChat | Community Social Platform";
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-white to-community-softGray dark:from-gray-900 dark:to-gray-950">
        <CommunitySidebar />
        <div className="flex-1 w-full">
          <Navbar />
          {!isHomePage && (
            <div className="flex items-center gap-2 p-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-b">
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
