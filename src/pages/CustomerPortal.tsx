
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { useToast } from "@/components/ui/use-toast";

// Import our refactored components
import AuthForms from "@/components/customer-portal/AuthForms";
import PortalContent from "@/components/customer-portal/PortalContent";
import { UpdatedProfileData } from "@/components/customer-portal/ProfilePage";

// Import mock data
import { 
  mockCertificates, 
  mockInvoices, 
  mockFaqVideos, 
  mockStats 
} from "@/components/customer-portal/mockData";

const CustomerPortal = () => {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);
  
  const { toast } = useToast();

  const handleLogin = (email: string, password: string, name: string) => {
    // Simple mock validation was moved to the AuthForms component
    
    // Mock successful login/signup
    setIsAuthenticated(true);
    setUserInfo({
      firstName: name || "Demo",
      lastName: "User",
      email: email || "demo@example.com"
    });
    
    toast({
      title: "Success",
      description: name ? "Your account has been created successfully." : "You have successfully logged in.",
      duration: 3000,
    });
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserInfo(null);
    
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
      duration: 3000,
    });
  };

  const handleProfileUpdate = (updatedProfile: UpdatedProfileData) => {
    setUserInfo({
      firstName: updatedProfile.firstName,
      lastName: updatedProfile.lastName,
      email: updatedProfile.email
    });
    
    // In a real application, this would also make an API call to update the user data
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      
      <div className="container mx-auto max-w-5xl px-4 py-6">
        {isAuthenticated ? (
          <PortalContent 
            user={userInfo}
            certificates={mockCertificates}
            invoices={mockInvoices}
            faqVideos={mockFaqVideos}
            stats={mockStats}
            onLogout={handleLogout}
            onProfileUpdate={handleProfileUpdate}
          />
        ) : (
          <div className="py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Customer Portal</h1>
            <AuthForms onLogin={handleLogin} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerPortal;
