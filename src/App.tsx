import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import MainLayout from "@/layouts/MainLayout";
import LoginPage from "@/pages/LoginPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import NotFound from "@/pages/NotFound";
import HomePage from "@/pages/HomePage";
import CommunityPage from "@/pages/CommunityPage";
import ProfilePage from "@/pages/ProfilePage";
import MembershipPage from "@/pages/MembershipPage";
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/*" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="community/:communityId" element={<CommunityPage />} />
              <Route path="profile/:profileId" element={<ProfilePage />} />
              <Route path="membership" element={<MembershipPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
