
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import DocumentUpload from "@/components/admin/DocumentUpload";
import CustomerList from "@/components/admin/CustomerList";
import AdminLogin from "@/components/admin/AdminLogin";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { UsersRound, FileText, ArrowUpRight } from "lucide-react";

// This would typically come from your database
const ADMIN_CREDENTIALS = {
  email: "admin@example.com",
  password: "admin123" // In a real app, use a proper authentication system
};

type Customer = {
  id: string;
  full_name: string;
  email: string;
};

const AdminPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [documents, setDocuments] = useState<number>(0);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const { toast } = useToast();

  // Check if admin is logged in via localStorage (basic approach)
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Fetch customers from Supabase when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCustomers();
      fetchStats();
    }
  }, [isAuthenticated]);

  const fetchCustomers = async () => {
    setIsLoadingCustomers(true);
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('id, full_name, email')
        .order('full_name', { ascending: true });

      if (error) {
        throw error;
      }

      setCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        title: "Error",
        description: "Failed to load customers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingCustomers(false);
    }
  };

  const fetchStats = async () => {
    setIsLoadingStats(true);
    try {
      // Get document count
      const { count, error } = await supabase
        .from('customer_documents')
        .select('id', { count: 'exact', head: true });

      if (error) {
        throw error;
      }

      setDocuments(count || 0);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };

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
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
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

  const handleUploadSuccess = () => {
    toast({
      title: "Upload successful",
      description: "Document has been uploaded successfully",
    });
    // Refresh statistics after upload
    fetchStats();
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navigation />
        <div className="container mx-auto max-w-md py-12">
          <h1 className="text-3xl font-bold text-center mb-8">Admin Portal</h1>
          <AdminLogin onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Portal</h1>
          <button 
            onClick={handleLogout}
            className="mt-2 sm:mt-0 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="upload">Upload Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6 flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <UsersRound className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Total Customers</h3>
                  <p className="text-2xl font-bold">
                    {isLoadingStats ? "..." : customers.length}
                  </p>
                  <button 
                    onClick={() => setActiveTab("customers")}
                    className="text-xs text-primary flex items-center mt-2"
                  >
                    View all <ArrowUpRight className="ml-1 h-3 w-3" />
                  </button>
                </div>
              </Card>
              
              <Card className="p-6 flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Total Documents</h3>
                  <p className="text-2xl font-bold">
                    {isLoadingStats ? "..." : documents}
                  </p>
                  <button 
                    onClick={() => setActiveTab("upload")}
                    className="text-xs text-primary flex items-center mt-2"
                  >
                    Upload more <ArrowUpRight className="ml-1 h-3 w-3" />
                  </button>
                </div>
              </Card>
            </div>
            
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <p className="text-muted-foreground">
                View recent customer activities and document uploads here.
              </p>
              {/* In a real app, this would display recent activities from a database */}
              <div className="mt-4 rounded-md bg-gray-50 p-4 text-sm">
                This is a placeholder for an activity feed. In a production environment, 
                this would show real-time updates of customer activities and document uploads.
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="customers" className="bg-white rounded-lg shadow p-6">
            {isLoadingCustomers ? (
              <div className="text-center py-8">Loading customers...</div>
            ) : (
              <CustomerList customers={customers} />
            )}
          </TabsContent>
          
          <TabsContent value="upload" className="bg-white rounded-lg shadow">
            <DocumentUpload 
              customers={customers} 
              onUploadSuccess={handleUploadSuccess} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPortal;
