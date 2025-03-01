
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigation } from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, FileCheck, Receipt, Download, Search, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for certificates and invoices
const mockCertificates = [
  { id: "GC-2023-001", name: "Gas Safety Certificate", date: "2023-10-15", expires: "2024-10-15", property: "123 Main St", status: "Valid" },
  { id: "GC-2023-002", name: "Boiler Service Certificate", date: "2023-11-20", expires: "2024-11-20", property: "123 Main St", status: "Valid" },
  { id: "GC-2022-003", name: "Gas Safety Certificate", date: "2022-10-10", expires: "2023-10-10", property: "123 Main St", status: "Expired" },
];

const mockInvoices = [
  { id: "INV-2023-001", description: "Annual Boiler Service", date: "2023-10-15", amount: 120.00, status: "Paid" },
  { id: "INV-2023-002", description: "Emergency Callout - Leak Fix", date: "2023-11-20", amount: 180.00, status: "Paid" },
  { id: "INV-2023-003", description: "Bathroom Sink Installation", date: "2023-12-05", amount: 350.00, status: "Pending" },
];

const CustomerPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("certificates");
  const { toast } = useToast();
  const { user } = useUser();

  const filteredCertificates = mockCertificates.filter(cert => 
    cert.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInvoices = mockInvoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    invoice.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (id: string, type: string) => {
    toast({
      title: `${type} Downloaded`,
      description: `${id} has been downloaded successfully.`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {user?.firstName ? `${user.firstName}'s Portal` : 'Customer Portal'}
          </h1>
          <p className="text-muted-foreground">View and manage your certificates and invoices</p>
        </div>
        
        <div className="mb-6">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search certificates or invoices..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="certificates" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="certificates" className="flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              <span>Certificates</span>
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              <span>Invoices</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="certificates" className="space-y-4">
            {filteredCertificates.length > 0 ? (
              filteredCertificates.map((cert) => (
                <Card key={cert.id} className="transition-all hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{cert.name}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        cert.status === "Valid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {cert.status}
                      </span>
                    </CardTitle>
                    <CardDescription>Certificate ID: {cert.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Issued: {new Date(cert.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Expires: {new Date(cert.expires).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 md:col-span-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>Property: {cert.property}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="ml-auto flex items-center gap-2"
                      onClick={() => handleDownload(cert.id, "Certificate")}
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground opacity-30 mb-4" />
                <h3 className="text-lg font-medium">No certificates found</h3>
                <p className="text-muted-foreground">Try adjusting your search term</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="invoices" className="space-y-4">
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <Card key={invoice.id} className="transition-all hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{invoice.description}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        invoice.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {invoice.status}
                      </span>
                    </CardTitle>
                    <CardDescription>Invoice ID: {invoice.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Date: {new Date(invoice.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Receipt className="h-4 w-4 text-muted-foreground" />
                        <span>Amount: £{invoice.amount.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="ml-auto flex items-center gap-2"
                      onClick={() => handleDownload(invoice.id, "Invoice")}
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <Receipt className="h-16 w-16 mx-auto text-muted-foreground opacity-30 mb-4" />
                <h3 className="text-lg font-medium">No invoices found</h3>
                <p className="text-muted-foreground">Try adjusting your search term</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerPortal;
