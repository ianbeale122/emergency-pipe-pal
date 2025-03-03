
import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Menu, Home, FileCheck, Receipt, HelpCircle, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

// Import Supabase functions
import { supabase, getCurrentUser, signIn, signUp, signOut } from "@/lib/supabase";
import { 
  fetchUserProfile, 
  fetchCertificates, 
  fetchInvoices, 
  fetchFaqVideos, 
  downloadCertificate, 
  downloadInvoice,
  updateUserProfile
} from "@/api/portal";

// Import refactored components
import SearchBar from "@/components/customer-portal/SearchBar";
import PortalTabs from "@/components/customer-portal/PortalTabs";
import DashboardTab from "@/components/customer-portal/DashboardTab";
import CertificatesTab from "@/components/customer-portal/CertificatesTab";
import InvoicesTab from "@/components/customer-portal/InvoicesTab";
import FaqVideosTab from "@/components/customer-portal/FaqVideosTab";

// Import types
import { Certificate } from "@/components/customer-portal/CertificateItem";
import { Invoice } from "@/components/customer-portal/InvoiceItem";
import { FaqVideo } from "@/types/faq";
import { UserProfile } from "@/api/portal";

const CustomerPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  
  // Data states
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [faqVideos, setFaqVideos] = useState<FaqVideo[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      const user = await getCurrentUser();
      
      if (user) {
        setIsAuthenticated(true);
        setUserId(user.id);
        loadUserData(user.id);
      } else {
        setIsLoading(false);
      }
    };
    
    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setIsAuthenticated(true);
          setUserId(session.user.id);
          loadUserData(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
          setUserId(null);
          resetData();
        }
      }
    );
    
    checkSession();
    
    // Cleanup subscription
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  // Load user data function
  const loadUserData = async (userId: string) => {
    setIsLoading(true);
    
    try {
      // Fetch profile, certificates, invoices, and FAQ videos in parallel
      const [profileData, certificatesData, invoicesData, faqVideosData] = await Promise.all([
        fetchUserProfile(userId),
        fetchCertificates(userId),
        fetchInvoices(userId),
        fetchFaqVideos()
      ]);
      
      if (profileData) {
        setUserProfile(profileData);
        setName(profileData.full_name);
      }
      
      setCertificates(certificatesData);
      setInvoices(invoicesData);
      setFaqVideos(faqVideosData);
    } catch (error) {
      console.error("Error loading user data:", error);
      toast({
        title: "Error",
        description: "Failed to load your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Reset data on logout
  const resetData = () => {
    setUserProfile(null);
    setCertificates([]);
    setInvoices([]);
    setName("");
    setEmail("");
    setPassword("");
  };

  // Filter data based on search term
  const filteredCertificates = certificates.filter(cert => 
    cert.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInvoices = invoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    invoice.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFaqVideos = faqVideos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Data interaction handlers
  const handleDownload = async (id: string, type: string) => {
    try {
      let url = null;
      
      if (type === "Certificate") {
        url = await downloadCertificate(id);
      } else if (type === "Invoice") {
        url = await downloadInvoice(id);
      }
      
      if (url) {
        // Open the URL in a new tab
        window.open(url, '_blank');
        
        toast({
          title: `${type} Downloaded`,
          description: `${id} has been downloaded successfully.`,
          duration: 3000,
        });
      } else {
        throw new Error("Could not generate download URL");
      }
    } catch (error) {
      console.error(`Error downloading ${type}:`, error);
      toast({
        title: "Download Failed",
        description: `Unable to download the ${type.toLowerCase()}. Please try again.`,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const playVideo = (videoId: number) => {
    toast({
      title: "Video Playback",
      description: `Opening video tutorial. This would open the full video in a real implementation.`,
      duration: 3000,
    });
  };

  // Authentication handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "You have successfully logged in.",
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !name) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    try {
      const { data, error } = await signUp(email, password, { full_name: name });
      
      if (error) throw error;
      
      if (data.user) {
        // Create profile
        await updateUserProfile({
          user_id: data.user.id,
          full_name: name,
          address: "",
          phone: "",
          created_at: new Date().toISOString()
        });
        
        toast({
          title: "Account Created",
          description: "Please check your email to confirm your account",
          duration: 3000,
        });
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Signup Failed",
        description: error.message || "An error occurred during signup",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
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
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : isAuthenticated ? (
          <>
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                    {userProfile?.full_name ? `${userProfile.full_name}'s Portal` : 'Customer Portal'}
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
                  stats={[
                    {
                      label: "Valid Certificates",
                      value: certificates.filter(c => c.status === "Valid").length,
                      icon: FileCheck,
                      color: "text-green-500"
                    },
                    {
                      label: "Pending Invoices",
                      value: invoices.filter(i => i.status === "Pending").length,
                      icon: Receipt,
                      color: "text-yellow-500"
                    },
                    {
                      label: "Total Invoices",
                      value: invoices.length,
                      icon: Receipt,
                      color: "text-blue-500"
                    },
                    {
                      label: "Help Videos",
                      value: faqVideos.length,
                      icon: HelpCircle,
                      color: "text-purple-500"
                    }
                  ]}
                  certificates={certificates}
                  invoices={invoices}
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
