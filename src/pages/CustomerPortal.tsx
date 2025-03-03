
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { TabsContent } from "@/components/ui/tabs";

// Import custom hook and components
import useCustomerPortal from "@/hooks/useCustomerPortal";
import AuthForms from "@/components/customer-portal/AuthForms";
import PortalHeader from "@/components/customer-portal/PortalHeader";
import SearchBar from "@/components/customer-portal/SearchBar";
import PortalTabs from "@/components/customer-portal/PortalTabs";
import DashboardTab from "@/components/customer-portal/DashboardTab";
import CertificatesTab from "@/components/customer-portal/CertificatesTab";
import InvoicesTab from "@/components/customer-portal/InvoicesTab";
import FaqVideosTab from "@/components/customer-portal/FaqVideosTab";

// Import icons
import { FileCheck, Receipt, HelpCircle } from "lucide-react";

const CustomerPortal = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Use our custom hook for portal logic
  const {
    isAuthenticated,
    isLoading,
    userProfile,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    certificates,
    invoices,
    faqVideos,
    filteredCertificates,
    filteredInvoices,
    filteredFaqVideos,
    handleDownload,
    playVideo,
    handleLogout
  } = useCustomerPortal();

  // Render loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navigation />
        <div className="container mx-auto max-w-5xl px-4 py-6">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      
      <div className="container mx-auto max-w-5xl px-4 py-6">
        {isAuthenticated ? (
          <>
            <PortalHeader 
              userProfile={userProfile}
              onLogout={handleLogout}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            
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
            <AuthForms />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerPortal;
