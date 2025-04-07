
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState({ email: "", password: "" });
  const [registerErrors, setRegisterErrors] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "", 
    terms: "" 
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, register } = useAuth();

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setLoginErrors({ email: "", password: "" });
    
    // Validate
    let hasErrors = false;
    if (!loginEmail) {
      setLoginErrors(prev => ({ ...prev, email: "Email is required" }));
      hasErrors = true;
    } else if (!validateEmail(loginEmail)) {
      setLoginErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
      hasErrors = true;
    }
    
    if (!loginPassword) {
      setLoginErrors(prev => ({ ...prev, password: "Password is required" }));
      hasErrors = true;
    }
    
    if (hasErrors) return;
    
    console.log("Login attempt with:", { loginEmail, loginPassword });
    
    const success = await login(loginEmail, loginPassword);
    if (success) {
      toast({
        title: "Login successful",
        description: "Welcome back to ComuChat!",
      });
      navigate("/");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setRegisterErrors({ 
      name: "", 
      email: "", 
      password: "", 
      confirmPassword: "", 
      terms: "" 
    });
    
    // Validate
    let hasErrors = false;
    
    if (!registerName) {
      setRegisterErrors(prev => ({ ...prev, name: "Name is required" }));
      hasErrors = true;
    }
    
    if (!registerEmail) {
      setRegisterErrors(prev => ({ ...prev, email: "Email is required" }));
      hasErrors = true;
    } else if (!validateEmail(registerEmail)) {
      setRegisterErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
      hasErrors = true;
    }
    
    if (!registerPassword) {
      setRegisterErrors(prev => ({ ...prev, password: "Password is required" }));
      hasErrors = true;
    } else if (registerPassword.length < 6) {
      setRegisterErrors(prev => ({ ...prev, password: "Password must be at least 6 characters" }));
      hasErrors = true;
    }
    
    if (!registerConfirmPassword) {
      setRegisterErrors(prev => ({ ...prev, confirmPassword: "Please confirm your password" }));
      hasErrors = true;
    } else if (registerPassword !== registerConfirmPassword) {
      setRegisterErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      hasErrors = true;
    }
    
    if (!acceptTerms) {
      setRegisterErrors(prev => ({ ...prev, terms: "You must accept the terms and conditions" }));
      hasErrors = true;
    }
    
    if (hasErrors) return;
    
    console.log("Register attempt with:", { 
      registerName, 
      registerEmail, 
      registerPassword,
      registerConfirmPassword 
    });
    
    const success = await register(registerName, registerEmail, registerPassword);
    if (success) {
      toast({
        title: "Registration successful",
        description: "Your account has been created! Welcome to ComuChat.",
      });
      navigate("/");
    } else {
      toast({
        title: "Registration failed",
        description: "Failed to create account",
        variant: "destructive"
      });
    }
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
        <h1 className="text-2xl font-bold">Welcome Back!</h1>
        <p className="text-gray-500">Sign in or create an account to continue</p>
      </div>

      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <Card>
            <form onSubmit={handleLogin}>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className={loginErrors.email ? "border-red-500" : ""}
                  />
                  {loginErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{loginErrors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-community-purple hover:text-community-darkPurple"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className={loginErrors.password ? "border-red-500 pr-10" : "pr-10"}
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {loginErrors.password && (
                    <p className="text-red-500 text-sm mt-1">{loginErrors.password}</p>
                  )}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-community-purple hover:bg-community-darkPurple"
                >
                  Sign In
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="register">
          <Card>
            <form onSubmit={handleRegister}>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Enter your information to create a new account
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className={registerErrors.name ? "border-red-500" : ""}
                  />
                  {registerErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{registerErrors.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className={registerErrors.email ? "border-red-500" : ""}
                  />
                  {registerErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{registerErrors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="register-password" 
                      type={showRegisterPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className={registerErrors.password ? "border-red-500 pr-10" : "pr-10"}
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    >
                      {showRegisterPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {registerErrors.password && (
                    <p className="text-red-500 text-sm mt-1">{registerErrors.password}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    className={registerErrors.confirmPassword ? "border-red-500" : ""}
                  />
                  {registerErrors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{registerErrors.confirmPassword}</p>
                  )}
                </div>
                
                <div className="flex items-start space-x-2 mt-4">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className={registerErrors.terms ? "border-red-500 mt-1" : "mt-1"}
                  />
                  <div>
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the Terms of Service and Privacy Policy
                    </label>
                    {registerErrors.terms && (
                      <p className="text-red-500 text-sm mt-1">{registerErrors.terms}</p>
                    )}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-community-purple hover:bg-community-darkPurple"
                >
                  Create Account
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          By continuing, you agree to our <Link to="/terms" className="text-community-purple hover:text-community-darkPurple">Terms of Service</Link> and <Link to="/privacy" className="text-community-purple hover:text-community-darkPurple">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
