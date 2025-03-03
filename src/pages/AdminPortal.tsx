
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import DocumentUpload from "@/components/admin/DocumentUpload";
import CustomerList from "@/components/admin/CustomerList";
import AdminLogin from "@/components/admin/AdminLogin";

// This would typically come from your database
const ADMIN_CREDENTIALS = {
  email: "admin@example.com",
  password: "admin123" // In a real app, use a proper authentication system
};

// Mock customer data - in a real app, this would come from your database
const mockCustomers = [
  { id: "cust_001", full_name: "John Smith", email: "john@example.com" },
  { id: "cust_002", full_name: "Sarah Johnson", email: "sarah@example.com" },
  { id: "cust_003", full_name: "Michael Brown", email: "michael@example.com" },
];

const AdminPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("customers");
  const { toast } = useToast();

  // Check if admin is logged in via localStorage (basic approach)
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (email: string, password: string) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="upload">Upload Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="customers" className="bg-white rounded-lg shadow p-6">
            <CustomerList customers={mockCustomers} />
          </TabsContent>
          
          <TabsContent value="upload" className="bg-white rounded-lg shadow">
            <DocumentUpload 
              customers={mockCustomers} 
              onUploadSuccess={handleUploadSuccess} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPortal;
