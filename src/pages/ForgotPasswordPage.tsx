
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "reset" | "success">("email");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [resetCodeError, setResetCodeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [demoResetCode, setDemoResetCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call the Supabase edge function to handle password reset
      const { data, error } = await supabase.functions.invoke("reset-password", {
        body: { email }
      });
      
      if (error) {
        throw error;
      }
      
      // For demo purposes, display the token (in a real app, this would be sent via email)
      if (data.debug && data.debug.token) {
        setDemoResetCode(data.debug.token);
      }
      
      toast({
        title: "Reset Code Sent",
        description: "If an account exists with this email, we've sent a reset code.",
      });
      
      setStep("reset");
    } catch (error) {
      console.error("Password reset request failed:", error);
      toast({
        title: "Request Failed",
        description: "Failed to request password reset. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetCodeError("");
    setPasswordError("");
    setConfirmPasswordError("");
    
    let hasErrors = false;
    
    if (!resetCode) {
      setResetCodeError("Reset code is required");
      hasErrors = true;
    }
    
    if (!newPassword) {
      setPasswordError("New password is required");
      hasErrors = true;
    } else if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasErrors = true;
    }
    
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your new password");
      hasErrors = true;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      hasErrors = true;
    }
    
    if (hasErrors) return;
    
    setIsLoading(true);
    
    try {
      // Call the Supabase edge function to verify the reset token and update password
      const { data, error } = await supabase.functions.invoke("verify-reset", {
        body: { 
          token: resetCode,
          email,
          newPassword
        }
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Password Reset Successful",
        description: "Your password has been updated. You can now log in with your new password.",
      });
      
      setStep("success");
    } catch (error) {
      console.error("Password reset failed:", error);
      setResetCodeError("Invalid or expired reset code. Please try again.");
      toast({
        title: "Reset Failed",
        description: "Failed to reset your password. Please check your code and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="container max-w-md py-12">
      <div className="text-center mb-8">
        <Link to="/" className="inline-flex items-center gap-2 mb-6">
          <div className="bg-community-purple rounded-md p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">
            ComuChat
          </span>
        </Link>
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="text-gray-500">We'll help you get back into your account</p>
      </div>

      <Alert className="mb-6 bg-blue-50 border-blue-200">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Demo Mode</AlertTitle>
        <AlertDescription>
          This is a demo application. For testing purposes, reset codes will be displayed on this page. In a production app, they would be sent via email.
        </AlertDescription>
      </Alert>

      <Card>
        {step === "email" && (
          <form onSubmit={handleRequestReset}>
            <CardHeader>
              <CardTitle>Forgot Password</CardTitle>
              <CardDescription>
                Enter your email address and we'll send you a code to reset your password
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={emailError ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline"
                onClick={handleBackToLogin}
                disabled={isLoading}
              >
                Back to Login
              </Button>
              <Button 
                type="submit" 
                className="bg-community-purple hover:bg-community-darkPurple"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Code"}
              </Button>
            </CardFooter>
          </form>
        )}

        {step === "reset" && (
          <form onSubmit={handleResetPassword}>
            <CardHeader>
              <CardTitle>Reset Your Password</CardTitle>
              <CardDescription>
                Enter the reset code and create a new password
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {demoResetCode && (
                <Alert className="bg-yellow-50 border-yellow-200 mb-4">
                  <AlertTitle>Demo Reset Code:</AlertTitle>
                  <AlertDescription className="font-mono text-lg font-bold">{demoResetCode}</AlertDescription>
                  <AlertDescription className="text-sm mt-2">
                    In a real application, this code would be sent to your email.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="reset-code">Reset Code</Label>
                <Input 
                  id="reset-code" 
                  placeholder="Enter the 6-digit code" 
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  className={resetCodeError ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {resetCodeError && (
                  <p className="text-red-500 text-sm mt-1">{resetCodeError}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={passwordError ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={confirmPasswordError ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {confirmPasswordError && (
                  <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setStep("email")}
                disabled={isLoading}
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="bg-community-purple hover:bg-community-darkPurple"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </CardFooter>
          </form>
        )}

        {step === "success" && (
          <>
            <CardHeader>
              <CardTitle>Password Reset Successful</CardTitle>
              <CardDescription>
                Your password has been reset successfully
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 text-center">
              <div className="bg-green-100 text-green-700 p-4 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p>Your password has been updated successfully. You can now log in with your new password.</p>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={handleBackToLogin}
                className="w-full bg-community-purple hover:bg-community-darkPurple"
              >
                Back to Login
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
      
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          Remember your password? <Link to="/login" className="text-community-purple hover:text-community-darkPurple">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
