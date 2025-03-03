
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

// For demo purposes - this would come from a database in a real app
const ADMIN_CREDENTIALS = {
  email: "admin@example.com",
  password: "admin123"
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

  const handleLogin = (email: string, password: string, rememberMe: boolean) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
      
      // If rememberMe is false, set up automatic logout after session
      if (!rememberMe) {
        // Auto logout after 2 hours of inactivity
        const autoLogoutTimeout = setTimeout(() => {
          handleLogout();
        }, 2 * 60 * 60 * 1000); // 2 hours
        
        // Reset timeout on user activity
        const resetTimeout = () => {
          clearTimeout(autoLogoutTimeout);
        };
        
        // Add event listeners to track user activity
        window.addEventListener('mousemove', resetTimeout);
        window.addEventListener('keydown', resetTimeout);
      }
      
      toast({
        title: "Login successful",
        description: "Welcome to the admin portal",
      });
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
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return {
    isAuthenticated,
    isLoading,
    handleLogin,
    handleLogout
  };
};
