
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { checkIsAdmin } from "@/api/portal";
import { getCurrentUser, signOut } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const user = await getCurrentUser();
        
        if (!user) {
          setIsAdmin(false);
          return;
        }
        
        // For mock admin in development
        if (user.user_metadata?.is_admin) {
          setIsAdmin(true);
          return;
        }
        
        const adminStatus = await checkIsAdmin(user.id);
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdmin();
  }, []);
  
  const handleLogout = async () => {
    try {
      await signOut();
      // Clear mock admin session if exists
      localStorage.removeItem('mockAdminSession');
      
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
      
      // Redirect after logout
      window.location.href = "/";
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navigation />
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Redirect non-admin users
  if (isAdmin === false) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Portal</h1>
          <Button variant="outline" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
        
        <AdminDashboard />
      </div>
    </div>
  );
};

export default Admin;
