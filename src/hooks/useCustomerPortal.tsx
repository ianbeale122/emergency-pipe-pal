
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { 
  fetchUserProfile, 
  fetchCertificates, 
  fetchInvoices, 
  fetchFaqVideos, 
  downloadCertificate, 
  downloadInvoice,
  UserProfile,
  checkIsAdmin
} from "@/api/portal";
import { getCurrentUser, signOut } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";
import { Certificate } from "@/components/customer-portal/CertificateItem";
import { Invoice } from "@/components/customer-portal/InvoiceItem";
import { FaqVideo } from "@/types/faq";

interface UseCustomerPortalReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  userProfile: UserProfile | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  certificates: Certificate[];
  invoices: Invoice[];
  faqVideos: FaqVideo[];
  filteredCertificates: Certificate[];
  filteredInvoices: Invoice[];
  filteredFaqVideos: FaqVideo[];
  handleDownload: (id: string, type: string) => Promise<void>;
  playVideo: (videoId: number) => void;
  handleLogout: () => Promise<void>;
  userId: string | null;
  isAdmin: boolean;
}

export const useCustomerPortal = (): UseCustomerPortalReturn => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
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
        
        // Check if user is admin from metadata
        if (user.user_metadata?.is_admin) {
          setIsAdmin(true);
        }
        
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
          
          // Check if user is admin from metadata
          if (session.user.user_metadata?.is_admin) {
            setIsAdmin(true);
          }
          
          loadUserData(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
          setUserId(null);
          setIsAdmin(false);
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
      const [profileData, certificatesData, invoicesData, faqVideosData, adminStatus] = await Promise.all([
        fetchUserProfile(userId),
        fetchCertificates(userId),
        fetchInvoices(userId),
        fetchFaqVideos(),
        checkIsAdmin(userId)
      ]);
      
      if (profileData) {
        setUserProfile(profileData);
        setIsAdmin(!!profileData.is_admin || adminStatus);
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

  // Download handler
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

  // Video player
  const playVideo = (videoId: number) => {
    toast({
      title: "Video Playback",
      description: `Opening video tutorial. This would open the full video in a real implementation.`,
      duration: 3000,
    });
  };

  // Logout handler
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

  return {
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
    handleLogout,
    userId,
    isAdmin
  };
};

export default useCustomerPortal;
