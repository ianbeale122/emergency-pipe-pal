
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

// Admin credentials - DO NOT use this approach in production!
const ADMIN_CREDENTIALS = {
  email: "beale122@gmail.com",
  password: "1234"
};

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if admin is logged in via localStorage on component mount
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (email: string, password: string, rememberMe: boolean) => {
    console.log("Login attempt:", { email, password, rememberMe });
    
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
      
      // Explicitly navigate to admin page after successful login
      navigate('/admin');
      
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
    navigate('/admin'); // Navigate back to admin login
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
