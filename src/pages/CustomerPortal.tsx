
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigation } from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  FileText, 
  FileCheck, 
  Receipt, 
  Download, 
  Search, 
  Calendar, 
  HelpCircle, 
  Home, 
  Settings, 
  Bell, 
  ShieldCheck, 
  History, 
  Map, 
  MessageSquare,
  Clock,
  User,
  Play,
  DollarSign,
  Check,
  AlertCircle,
  Building,
  Wrench,
  Droplet,
  Thermometer
} from "lucide-react";
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
  { id: "INV-2024-001", description: "Radiator Replacement", date: "2024-01-15", amount: 420.00, status: "Overdue" },
];

// Mock FAQ videos
const mockFaqVideos = [
  { id: 1, title: "How to Bleed a Radiator", thumbnail: "https://images.unsplash.com/photo-1581092242409-b27d24be9536", duration: "4:32", category: "Heating" },
  { id: 2, title: "Fixing a Dripping Tap", thumbnail: "https://images.unsplash.com/photo-1540587659271-5a67befab240", duration: "6:15", category: "Plumbing" },
  { id: 3, title: "Unblocking a Sink", thumbnail: "https://images.unsplash.com/photo-1540518614846-7eded433c457", duration: "5:47", category: "Plumbing" },
  { id: 4, title: "Boiler Pressure Guide", thumbnail: "https://images.unsplash.com/photo-1524270000-94f8ff3b8ff2", duration: "8:22", category: "Heating" },
];

// Statistics for the dashboard
const mockStats = [
  { label: "Active Certificates", value: 2, icon: ShieldCheck, color: "text-green-500" },
  { label: "Upcoming Renewals", value: 1, icon: Calendar, color: "text-amber-500" },
  { label: "Pending Invoices", value: 1, icon: Receipt, color: "text-blue-500" },
  { label: "Total Properties", value: 1, icon: Building, color: "text-purple-500" },
];

const CustomerPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
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

  const filteredFaqVideos = mockFaqVideos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (id: string, type: string) => {
    toast({
      title: `${type} Downloaded`,
      description: `${id} has been downloaded successfully.`,
      duration: 3000,
    });
  };

  const playVideo = (videoId: number) => {
    toast({
      title: "Video Playback",
      description: `Opening video tutorial. This would open the full video in a real implementation.`,
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
          <p className="text-muted-foreground">Manage your certificates, invoices and access helpful resources</p>
        </div>
        
        <div className="mb-6">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search across your portal..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="dashboard" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 overflow-x-auto flex whitespace-nowrap p-1 w-full max-w-3xl">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              <span>Certificates</span>
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              <span>Invoices</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>Video Tutorials</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockStats.map((stat, index) => (
                <Card key={index} className="transition-all hover:shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`rounded-full p-3 bg-opacity-10 ${stat.color.replace('text-', 'bg-')}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-500" />
                    <span>Recent Certificates</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {mockCertificates.slice(0, 2).map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between mb-4 last:mb-0">
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-muted-foreground">Expires: {new Date(cert.expires).toLocaleDateString()}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        cert.status === "Valid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {cert.status}
                      </span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab("certificates")}
                  >
                    View All Certificates
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-blue-500" />
                    <span>Recent Invoices</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {mockInvoices.slice(0, 2).map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between mb-4 last:mb-0">
                      <div>
                        <p className="font-medium">{invoice.description}</p>
                        <p className="text-sm text-muted-foreground">Due: {new Date(invoice.date).toLocaleDateString()}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        invoice.status === "Paid" ? "bg-green-100 text-green-800" : 
                        invoice.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
                        "bg-red-100 text-red-800"
                      }`}>
                        {invoice.status}
                      </span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab("invoices")}
                  >
                    View All Invoices
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Certificates Tab */}
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
          
          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Your Invoices</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  <span>Paid</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Pending</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>Overdue</span>
                </Button>
              </div>
            </div>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <Card key={invoice.id} className="transition-all hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{invoice.description}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        invoice.status === "Paid" ? "bg-green-100 text-green-800" : 
                        invoice.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
                        "bg-red-100 text-red-800"
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
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>Amount: £{invoice.amount.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {invoice.status !== "Paid" && (
                      <Button 
                        variant="default" 
                        className="flex items-center gap-2"
                      >
                        <DollarSign className="h-4 w-4" />
                        <span>Pay Now</span>
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      className={invoice.status !== "Paid" ? "ml-auto" : ""}
                      onClick={() => handleDownload(invoice.id, "Invoice")}
                    >
                      <Download className="h-4 w-4 mr-2" />
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
          
          {/* FAQ Video Tutorials Tab */}
          <TabsContent value="faq" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Video Tutorials</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Droplet className="h-4 w-4" />
                  <span>Plumbing</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Thermometer className="h-4 w-4" />
                  <span>Heating</span>
                </Button>
              </div>
            </div>
            
            {filteredFaqVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFaqVideos.map((video) => (
                  <Card key={video.id} className="overflow-hidden transition-all hover:shadow-md">
                    <div className="relative">
                      <div className="aspect-video bg-gray-200 relative overflow-hidden">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="rounded-full bg-white text-black hover:bg-white/90"
                            onClick={() => playVideo(video.id)}
                          >
                            <Play className="h-5 w-5 fill-current" />
                          </Button>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{video.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {video.category}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center gap-2"
                        onClick={() => playVideo(video.id)}
                      >
                        <Play className="h-4 w-4" />
                        <span>Watch Tutorial</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Play className="h-16 w-16 mx-auto text-muted-foreground opacity-30 mb-4" />
                <h3 className="text-lg font-medium">No video tutorials found</h3>
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
