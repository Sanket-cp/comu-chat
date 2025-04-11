
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();

  // Check if user is already logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Get stored users from localStorage
    const storedUsers = localStorage.getItem("users") || "[]";
    const users = JSON.parse(storedUsers);
    
    // Find user with matching email
    const userMatch = users.find((u: any) => u.email === email);
    
    if (userMatch && userMatch.password === password) {
      // Successful login
      const loggedInUser = {
        id: userMatch.id,
        name: userMatch.name,
        email: userMatch.email,
      };
      
      setUser(loggedInUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${loggedInUser.name}!`,
      });
      
      return true;
    }
    
    // Failed login
    toast({
      title: "Login failed",
      description: "Invalid email or password",
      variant: "destructive"
    });
    
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    if (!name || !email.includes("@") || password.length < 6) {
      toast({
        title: "Registration failed",
        description: "Please provide a valid name, email, and password (min 6 characters)",
        variant: "destructive"
      });
      return false;
    }
    
    // Get existing users
    const storedUsers = localStorage.getItem("users") || "[]";
    const users = JSON.parse(storedUsers);
    
    // Check if email already exists
    if (users.some((user: any) => user.email.toLowerCase() === email.toLowerCase())) {
      toast({
        title: "Registration failed",
        description: "Email already in use",
        variant: "destructive"
      });
      return false;
    }
    
    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password, // Store password for validation (in a real app, this would be hashed)
      createdAt: new Date().toISOString()
    };
    
    // Add user to users array and save
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    // Auto login after registration
    const loggedInUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    
    setUser(loggedInUser);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
