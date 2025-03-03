import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

// Import components
import SearchBar from "@/components/customer-portal/SearchBar";
import PortalTabs from "@/components/customer-portal/PortalTabs";
import DashboardTab from "@/components/customer-portal/DashboardTab";
import CertificatesTab from "@/components/customer-portal/CertificatesTab";
import InvoicesTab from "@/components/customer-portal/InvoicesTab";
import FaqVideosTab from "@/components/customer-portal/FaqVideosTab";
import PortalHeader from "@/components/customer-portal/PortalHeader";
import ProfilePage from "@/components/customer-portal/ProfilePage";
import { UpdatedProfileData } from "@/components/customer-portal/ProfilePage";

// Import types
import { Certificate } from "@/components/customer-portal/CertificateItem";
import { Invoice } from "@/components/customer-portal/InvoiceItem";
import { FaqVideo } from "@/components/customer-portal/FaqVideoItem";

interface PortalContentProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  certificates: Certificate[];
  invoices: Invoice[];
  faqVideos: FaqVideo[];
  stats: Array<{
    label: string;
    value: number;
    icon: any;
    color: string;
  }>;
  onLogout: () => void;
  onProfileUpdate?: (updatedProfile: UpdatedProfileData) => void;
}

const PortalContent = ({ 
  user, 
  certificates, 
  invoices, 
  faqVideos, 
  stats, 
  onLogout,
  onProfileUpdate 
}: PortalContentProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  const [updatedUser, setUpdatedUser] = useState(user);

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

  const handleProfileUpdate = (updatedProfile: UpdatedProfileData) => {
    setUpdatedUser({
      firstName: updatedProfile.firstName,
      lastName: updatedProfile.lastName,
      email: updatedProfile.email
    });
    
    if (onProfileUpdate) {
      onProfileUpdate(updatedProfile);
    }
  };

  const goToAdminPortal = () => {
    localStorage.removeItem("adminAuth");
    
    if (user && user.email === "beale122@gmail.com") {
      localStorage.setItem("adminEmail", user.email);
      
      toast({
        title: "Redirecting to admin portal",
        description: "Use your customer portal credentials to log in",
      });
    }
    
    window.location.href = '/admin';
  };

  return (
    <>
      <PortalHeader 
        userName={updatedUser?.firstName || null}
        onLogout={onLogout}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAdminClick={goToAdminPortal}
        isAdmin={user?.email === "beale122@gmail.com"}
      />
      
      {activeTab !== "profile" && (
        <div className="mb-6">
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
        </div>
      )}
      
      <PortalTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      >
        <TabsContent value="dashboard" className="animate-fade-in">
          <DashboardTab 
            stats={stats}
            certificates={certificates}
            invoices={invoices}
            onViewAllCertificates={() => setActiveTab("certificates")}
            onViewAllInvoices={() => setActiveTab("invoices")}
          />
        </TabsContent>
        
        <TabsContent value="certificates" className="animate-fade-in">
          <CertificatesTab 
            certificates={filteredCertificates}
            onDownload={handleDownload}
          />
        </TabsContent>
        
        <TabsContent value="invoices" className="animate-fade-in">
          <InvoicesTab 
            invoices={filteredInvoices}
            onDownload={handleDownload}
          />
        </TabsContent>
        
        <TabsContent value="faq" className="animate-fade-in">
          <FaqVideosTab 
            videos={filteredFaqVideos}
            onPlay={playVideo}
          />
        </TabsContent>
        
        <TabsContent value="profile" className="animate-fade-in">
          <ProfilePage
            user={updatedUser}
            onProfileUpdate={handleProfileUpdate}
          />
        </TabsContent>
      </PortalTabs>
    </>
  );
};

export default PortalContent;
