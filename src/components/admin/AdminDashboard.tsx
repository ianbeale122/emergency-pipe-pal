
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAllInvoices, fetchAllUsers, Invoice, UserProfile, createInvoice, updateInvoice, deleteInvoice } from "@/api/portal";
import { useToast } from "@/components/ui/use-toast";
import InvoiceForm from "./InvoiceForm";
import InvoiceList from "./InvoiceList";
import UserList from "./UserList";

const AdminDashboard = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("invoices");
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [invoicesData, usersData] = await Promise.all([
        fetchAllInvoices(),
        fetchAllUsers()
      ]);
      
      setInvoices(invoicesData);
      setUsers(usersData);
    } catch (error) {
      console.error("Error loading admin data:", error);
      toast({
        title: "Error",
        description: "Failed to load data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateInvoice = async (invoice: Omit<Invoice, 'id'>) => {
    try {
      const result = await createInvoice(invoice);
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Invoice created successfully",
        });
        loadData();
        setShowInvoiceForm(false);
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create invoice",
        variant: "destructive",
      });
    }
  };

  const handleUpdateInvoice = async (id: string, invoice: Partial<Invoice>) => {
    try {
      const result = await updateInvoice(id, invoice);
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Invoice updated successfully",
        });
        loadData();
        setEditingInvoice(null);
        setShowInvoiceForm(false);
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update invoice",
        variant: "destructive",
      });
    }
  };

  const handleDeleteInvoice = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        const result = await deleteInvoice(id);
        
        if (result.success) {
          toast({
            title: "Success",
            description: "Invoice deleted successfully",
          });
          loadData();
        } else {
          throw new Error(result.error);
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to delete invoice",
          variant: "destructive",
        });
      }
    }
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setShowInvoiceForm(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>Manage invoices and users</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            
            <TabsContent value="invoices" className="space-y-4">
              {showInvoiceForm ? (
                <InvoiceForm 
                  users={users} 
                  invoice={editingInvoice}
                  onSubmit={(invoice) => {
                    if (editingInvoice) {
                      handleUpdateInvoice(editingInvoice.id, invoice);
                    } else {
                      handleCreateInvoice(invoice as Omit<Invoice, 'id'>);
                    }
                  }}
                  onCancel={() => {
                    setShowInvoiceForm(false);
                    setEditingInvoice(null);
                  }}
                />
              ) : (
                <>
                  <Button onClick={() => setShowInvoiceForm(true)}>
                    Create New Invoice
                  </Button>
                  <InvoiceList 
                    invoices={invoices} 
                    users={users}
                    onEdit={handleEditInvoice}
                    onDelete={handleDeleteInvoice}
                  />
                </>
              )}
            </TabsContent>
            
            <TabsContent value="users">
              <UserList users={users} />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Total invoices: {invoices.length} | Total users: {users.length}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminDashboard;
