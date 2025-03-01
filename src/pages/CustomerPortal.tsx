
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigation } from "@/components/Navigation";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                {user?.firstName ? `${user.firstName}'s Portal` : 'Customer Portal'}
              </h1>
              <p className="text-sm text-muted-foreground">Manage your certificates, invoices and access resources</p>
            </div>
            
            {/* Mobile menu button */}
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild className="sm:hidden">
                <Button variant="outline" size="icon">
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
                    Video Tutorials
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
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
          <TabsContent value="dashboard">
            <DashboardTab 
              stats={mockStats}
              certificates={mockCertificates}
              invoices={mockInvoices}
              onViewAllCertificates={() => setActiveTab("certificates")}
              onViewAllInvoices={() => setActiveTab("invoices")}
            />
          </TabsContent>
          
          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <CertificatesTab 
              certificates={filteredCertificates}
              onDownload={handleDownload}
            />
          </TabsContent>
          
          {/* Invoices Tab */}
          <TabsContent value="invoices">
            <InvoicesTab 
              invoices={filteredInvoices}
              onDownload={handleDownload}
            />
          </TabsContent>
          
          {/* FAQ Video Tutorials Tab */}
          <TabsContent value="faq">
            <FaqVideosTab 
              videos={filteredFaqVideos}
              onPlay={playVideo}
            />
          </TabsContent>
        </PortalTabs>
      </div>
    </div>
  );
};

export default CustomerPortal;
