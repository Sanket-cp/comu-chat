
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

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
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleRequestReset = (e: React.FormEvent) => {
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
    
    // Get stored users
    const storedUsers = localStorage.getItem("users") || "[]";
    const users = JSON.parse(storedUsers);
    
    // Check if user exists
    const userExists = users.some((user: any) => user.email === email);
    
    if (!userExists) {
      setEmailError("No account found with this email address");
      return;
    }
    
    // Generate a reset code (in a real app, this would be sent via email)
    const mockResetCode = "123456"; // In a real app, this would be a random string
    setDemoResetCode(mockResetCode);
    
    // Store the reset code (in a real app, this would be stored securely in the backend)
    const passwordResets = JSON.parse(localStorage.getItem("passwordResets") || "{}");
    passwordResets[email] = {
      code: mockResetCode,
      expiresAt: new Date(Date.now() + 30 * 60000).toISOString(), // 30 minutes from now
    };
    localStorage.setItem("passwordResets", JSON.stringify(passwordResets));
    
    toast({
      title: "Demo Mode: Reset Code Generated",
      description: "In a real app, the code would be sent to your email.",
    });
    
    setStep("reset");
  };

  const handleResetPassword = (e: React.FormEvent) => {
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
    
    // Verify the reset code
    const passwordResets = JSON.parse(localStorage.getItem("passwordResets") || "{}");
    const resetInfo = passwordResets[email];
    
    if (!resetInfo || resetInfo.code !== resetCode) {
      setResetCodeError("Invalid reset code");
      return;
    }
    
    // Check if the reset code has expired
    if (new Date(resetInfo.expiresAt) < new Date()) {
      setResetCodeError("Reset code has expired. Please request a new one");
      return;
    }
    
    // Update the user's password
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = storedUsers.map((user: any) => {
      if (user.email === email) {
        return { ...user, password: newPassword };
      }
      return user;
    });
    
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    // Clean up the reset code
    delete passwordResets[email];
    localStorage.setItem("passwordResets", JSON.stringify(passwordResets));
    
    toast({
      title: "Password reset successful",
      description: "Your password has been updated. You can now log in with your new password.",
    });
    
    setStep("success");
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
          This is a demo application. No actual emails are sent. Reset codes will be displayed on this page.
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
              >
                Back to Login
              </Button>
              <Button 
                type="submit" 
                className="bg-community-purple hover:bg-community-darkPurple"
              >
                Send Reset Code
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
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="bg-community-purple hover:bg-community-darkPurple"
              >
                Reset Password
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
