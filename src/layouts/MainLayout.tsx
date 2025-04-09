
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CommunitySidebar from "@/components/CommunitySidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect } from "react";
import SafetyButton from "@/components/SafetyButton";

const MainLayout = () => {
  useEffect(() => {
    document.title = "ComuChat | Community Social Platform";
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-white to-community-softGray dark:from-gray-900 dark:to-gray-950">
        <CommunitySidebar />
        <div className="flex-1">
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)] animate-fade-in">
            <Outlet />
          </main>
          <SafetyButton />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
