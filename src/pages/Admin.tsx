
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Navigation } from "@/components/Navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import UserList from "@/components/admin/UserList";
import InvoiceList from "@/components/admin/InvoiceList";
import InvoiceForm from "@/components/admin/InvoiceForm";
import DocumentUpload from "@/components/admin/DocumentUpload";
import { getCurrentUser, signOut } from "@/lib/supabase";
import { checkIsAdmin } from "@/api/portal";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  // Add dummy data for now to fix TypeScript errors
  const dummyUsers = []; 
  const dummyInvoices = [];
  const handleEdit = () => {};
  const handleDelete = () => {};

  useEffect(() => {
    const checkAdmin = async () => {
      setLoading(true);
      try {
        const user = await getCurrentUser();
        if (!user) {
          setIsAdmin(false);
          return;
        }
        
        const adminStatus = await checkIsAdmin(user.id);
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAdmin();
  }, []);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
      window.location.href = "/";
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isAdmin === false) {
    toast({
      title: "Access Denied",
      description: "You do not have permission to access the admin area",
      variant: "destructive",
    });
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage your business data</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white shadow-sm rounded-lg p-1 overflow-x-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-1">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="users">Customers</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="upload">Upload Documents</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-6">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="p-6">
              <UserList users={dummyUsers} />
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <Card className="p-6">
              <InvoiceList 
                invoices={dummyInvoices} 
                users={dummyUsers} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            </Card>
          </TabsContent>
          
          <TabsContent value="certificates" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Customer Certificates</h2>
              <p className="text-muted-foreground mb-6">
                View and manage all customer certificates.
              </p>
              {/* Certificate list would go here */}
              <p>Certificate management is currently being developed.</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DocumentUpload documentType="certificate" />
              <DocumentUpload documentType="invoice" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
