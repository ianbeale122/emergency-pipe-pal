
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Menu, Home, FileCheck, Receipt, HelpCircle, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Import refactored components
import SearchBar from "@/components/customer-portal/SearchBar";
import PortalTabs from "@/components/customer-portal/PortalTabs";
import DashboardTab from "@/components/customer-portal/DashboardTab";
import CertificatesTab from "@/components/customer-portal/CertificatesTab";
import InvoicesTab from "@/components/customer-portal/InvoicesTab";
import FaqVideosTab from "@/components/customer-portal/FaqVideosTab";

// Import mock data
import { 
  mockCertificates, 
  mockInvoices, 
  mockFaqVideos, 
  mockStats 
} from "@/components/customer-portal/mockData";

const CustomerPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const { toast } = useToast();
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  // Replace Clerk's useUser with a mock user
  const user = isAuthenticated ? {
    firstName: name || "Demo",
    lastName: "User",
    email: email || "demo@example.com"
  } : null;

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple mock validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Mock successful login
    setIsAuthenticated(true);
    toast({
      title: "Success",
      description: "You have successfully logged in.",
      duration: 3000,
    });
  };
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple mock validation
    if (!email || !password || !name) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Mock successful signup
    setIsAuthenticated(true);
    toast({
      title: "Account Created",
      description: "Your account has been created successfully.",
      duration: 3000,
    });
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
    setName("");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
      duration: 3000,
    });
  };

  // Authentication forms
  const renderAuthForms = () => {
    if (isLoginView) {
      return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Log in to your account</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">Log in</Button>
          </form>
          <div className="mt-4 text-center">
            <p>
              Don't have an account?{' '}
              <Button variant="link" className="p-0" onClick={() => setIsLoginView(false)}>
                Sign up
              </Button>
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Create your account</h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">Sign up</Button>
          </form>
          <div className="mt-4 text-center">
            <p>
              Already have an account?{' '}
              <Button variant="link" className="p-0" onClick={() => setIsLoginView(true)}>
                Log in
              </Button>
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      
      <div className="container mx-auto max-w-5xl px-4 py-6">
        {isAuthenticated ? (
          <>
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                    {user?.firstName ? `${user.firstName}'s Portal` : 'Customer Portal'}
                  </h1>
                  <p className="text-sm text-muted-foreground">Manage your certificates, invoices and access resources</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button variant="outline" onClick={handleLogout}>
                    Log out
                  </Button>
                  
                  {/* Mobile menu button */}
                  <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                    <SheetTrigger asChild className="sm:hidden">
                      <Button variant="outline" size="icon" className="shadow-sm">
                        <Menu className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[80%] pt-12">
                      <div className="flex flex-col gap-4">
                        <Button
                          variant={activeTab === "dashboard" ? "default" : "ghost"}
                          className="justify-start"
                          onClick={() => {
                            setActiveTab("dashboard");
                            setMenuOpen(false);
                          }}
                        >
                          <Home className="h-5 w-5 mr-2" />
                          Dashboard
                        </Button>
                        <Button
                          variant={activeTab === "certificates" ? "default" : "ghost"}
                          className="justify-start"
                          onClick={() => {
                            setActiveTab("certificates");
                            setMenuOpen(false);
                          }}
                        >
                          <FileCheck className="h-5 w-5 mr-2" />
                          Certificates
                        </Button>
                        <Button
                          variant={activeTab === "invoices" ? "default" : "ghost"}
                          className="justify-start"
                          onClick={() => {
                            setActiveTab("invoices");
                            setMenuOpen(false);
                          }}
                        >
                          <Receipt className="h-5 w-5 mr-2" />
                          Invoices
                        </Button>
                        <Button
                          variant={activeTab === "faq" ? "default" : "ghost"}
                          className="justify-start"
                          onClick={() => {
                            setActiveTab("faq");
                            setMenuOpen(false);
                          }}
                        >
                          <HelpCircle className="h-5 w-5 mr-2" />
                          Video Tutorials
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <SearchBar 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
              />
            </div>
            
            <PortalTabs 
              activeTab={activeTab} 
              onTabChange={setActiveTab}
            >
              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="animate-fade-in">
                <DashboardTab 
                  stats={mockStats}
                  certificates={mockCertificates}
                  invoices={mockInvoices}
                  onViewAllCertificates={() => setActiveTab("certificates")}
                  onViewAllInvoices={() => setActiveTab("invoices")}
                />
              </TabsContent>
              
              {/* Certificates Tab */}
              <TabsContent value="certificates" className="animate-fade-in">
                <CertificatesTab 
                  certificates={filteredCertificates}
                  onDownload={handleDownload}
                />
              </TabsContent>
              
              {/* Invoices Tab */}
              <TabsContent value="invoices" className="animate-fade-in">
                <InvoicesTab 
                  invoices={filteredInvoices}
                  onDownload={handleDownload}
                />
              </TabsContent>
              
              {/* FAQ Video Tutorials Tab */}
              <TabsContent value="faq" className="animate-fade-in">
                <FaqVideosTab 
                  videos={filteredFaqVideos}
                  onPlay={playVideo}
                />
              </TabsContent>
            </PortalTabs>
          </>
        ) : (
          <div className="py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Customer Portal</h1>
            {renderAuthForms()}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerPortal;
