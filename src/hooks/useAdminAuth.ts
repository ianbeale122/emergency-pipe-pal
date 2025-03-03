
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Admin credentials - DO NOT use this approach in production!
const ADMIN_CREDENTIALS = {
  email: "beale122@gmail.com",
  password: "1234"
};

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if admin is logged in via localStorage on component mount
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (email: string, password: string, rememberMe: boolean): boolean => {
    console.log("Login attempt:", { email, password, rememberMe });
    
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      
      // Store authentication in localStorage
      localStorage.setItem("adminAuth", "true");
      
      // Toast notification for successful login
      toast({
        title: "Login successful",
        description: "Welcome to the admin portal",
      });
      
      // If rememberMe is false, set up automatic logout after session
      if (!rememberMe) {
        // Auto logout after 2 hours of inactivity
        const inactivityTimeout = 2 * 60 * 60 * 1000; // 2 hours
        const logoutTime = Date.now() + inactivityTimeout;
        localStorage.setItem("adminLogoutTime", logoutTime.toString());
      }
      
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminLogoutTime");
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    
    // Redirect to admin login page
    window.location.href = '/admin';
  };

  return {
    isAuthenticated,
    isLoading,
    handleLogin,
    handleLogout
  };
};
