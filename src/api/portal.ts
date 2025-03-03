import { supabase } from "@/lib/supabase";

// Types
export interface UserProfile {
  user_id: string;
  full_name: string;
  address?: string;
  phone?: string;
  created_at: string;
}

// API functions with mock data fallbacks
export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    // Check if Supabase is configured by checking URL
    const isSupabaseConfigured = !!(supabase && 'url' in supabase);
    
    if (!isSupabaseConfigured) {
      console.warn("Supabase not configured, using mock profile data");
      // Return mock data for development
      return {
        user_id: userId,
        full_name: "John Doe",
        address: "123 Main St, London",
        phone: "+44 123 456789",
        created_at: new Date().toISOString()
      };
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

export const updateUserProfile = async (profile: UserProfile): Promise<UserProfile | null> => {
  try {
    // Check if Supabase is configured
    const isSupabaseConfigured = !!(supabase && 'url' in supabase);
    
    if (!isSupabaseConfigured) {
      console.warn("Supabase not configured, profile update simulated");
      return profile;
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('user_id', profile.user_id);
      
    if (error) throw error;
    return profile;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return null;
  }
};

export const fetchCertificates = async (userId: string) => {
  // Mock data for when Supabase isn't configured
  const mockCertificates = [
    {
      id: "CERT-001",
      user_id: userId,
      name: "Gas Safety Certificate",
      property: "123 Main St, London",
      issue_date: "2023-01-15",
      expiry_date: "2024-01-15",
      status: "Valid"
    },
    {
      id: "CERT-002",
      user_id: userId,
      name: "Boiler Service Certificate",
      property: "123 Main St, London",
      issue_date: "2023-03-10",
      expiry_date: "2024-03-10",
      status: "Valid"
    }
  ];
  
  try {
    // Check if Supabase is configured
    const isSupabaseConfigured = !!(supabase && 'url' in supabase);
    
    if (!isSupabaseConfigured) {
      console.warn("Supabase not configured, using mock certificate data");
      return mockCertificates;
    }
    
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', userId);
      
    if (error) throw error;
    return data.length ? data : mockCertificates;
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return mockCertificates;
  }
};

export const fetchInvoices = async (userId: string) => {
  // Mock data for when Supabase isn't configured
  const mockInvoices = [
    {
      id: "INV-001",
      user_id: userId,
      amount: 120,
      currency: "GBP",
      date: "2023-02-05",
      due_date: "2023-03-05",
      status: "Paid",
      description: "Annual Boiler Service"
    },
    {
      id: "INV-002",
      user_id: userId,
      amount: 85,
      currency: "GBP",
      date: "2023-04-20",
      due_date: "2023-05-20",
      status: "Outstanding",
      description: "Bathroom Tap Replacement"
    }
  ];
  
  try {
    // Check if Supabase is configured
    const isSupabaseConfigured = !!(supabase && 'url' in supabase);
    
    if (!isSupabaseConfigured) {
      console.warn("Supabase not configured, using mock invoice data");
      return mockInvoices;
    }
    
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('user_id', userId);
      
    if (error) throw error;
    return data.length ? data : mockInvoices;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return mockInvoices;
  }
};

export const fetchFaqVideos = async () => {
  // Mock data for when Supabase isn't configured
  const mockVideos = [
    {
      id: 1,
      title: "How to Reset Your Boiler",
      description: "A step-by-step guide to safely resetting your boiler when it stops working.",
      thumbnail: "https://placehold.co/300x200?text=Boiler+Reset",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "3:45",
      category: "Heating"
    },
    {
      id: 2,
      title: "Fixing a Dripping Tap",
      description: "Learn how to fix a common dripping tap problem without calling a plumber.",
      thumbnail: "https://placehold.co/300x200?text=Dripping+Tap",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "5:20",
      category: "Plumbing"
    },
    {
      id: 3,
      title: "Bleeding Radiators",
      description: "How to properly bleed radiators to improve heating efficiency.",
      thumbnail: "https://placehold.co/300x200?text=Bleeding+Radiators",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "4:10",
      category: "Heating"
    }
  ];
  
  try {
    // Check if Supabase is configured
    const isSupabaseConfigured = !!(supabase && 'url' in supabase);
    
    if (!isSupabaseConfigured) {
      console.warn("Supabase not configured, using mock FAQ video data");
      return mockVideos;
    }
    
    const { data, error } = await supabase
      .from('faq_videos')
      .select('*');
      
    if (error) throw error;
    return data.length ? data : mockVideos;
  } catch (error) {
    console.error("Error fetching FAQ videos:", error);
    return mockVideos;
  }
};

export const downloadCertificate = async (id: string) => {
  // Mock data for when Supabase isn't configured
  try {
    // Check if Supabase is configured
    const isSupabaseConfigured = !!(supabase && 'url' in supabase);
    
    if (!isSupabaseConfigured) {
      console.warn("Supabase not configured, returning mock download URL");
      return "https://placehold.co/600x800?text=Certificate+" + id;
    }
    
    // In a real app, this would get a download URL from Supabase storage
    const { data, error } = await supabase.storage
      .from('certificates')
      .download(`${id}.pdf`);
      
    if (error) throw error;
    
    // Create a URL for the downloaded file
    const url = URL.createObjectURL(data);
    return url;
  } catch (error) {
    console.error("Error downloading certificate:", error);
    return "https://placehold.co/600x800?text=Certificate+" + id;
  }
};

export const downloadInvoice = async (id: string) => {
  // Mock data for when Supabase isn't configured
  try {
    // Check if Supabase is configured
    const isSupabaseConfigured = !!(supabase && 'url' in supabase);
    
    if (!isSupabaseConfigured) {
      console.warn("Supabase not configured, returning mock download URL");
      return "https://placehold.co/600x800?text=Invoice+" + id;
    }
    
    // In a real app, this would get a download URL from Supabase storage
    const { data, error } = await supabase.storage
      .from('invoices')
      .download(`${id}.pdf`);
      
    if (error) throw error;
    
    // Create a URL for the downloaded file
    const url = URL.createObjectURL(data);
    return url;
  } catch (error) {
    console.error("Error downloading invoice:", error);
    return "https://placehold.co/600x800?text=Invoice+" + id;
  }
};

export const submitIssue = async (issue: any) => {
  try {
    // Check if Supabase is configured
    const isSupabaseConfigured = !!(supabase && 'url' in supabase);
    
    if (!isSupabaseConfigured) {
      console.warn("Supabase not configured, simulating issue submission");
      return { success: true, id: "ISSUE-" + Math.floor(Math.random() * 1000) };
    }
    
    const { data, error } = await supabase
      .from('issues')
      .insert([issue]);
      
    if (error) throw error;
    
    return { success: true, id: data && data[0] ? data[0].id : "ISSUE-" + Math.floor(Math.random() * 1000) };
  } catch (error) {
    console.error("Error submitting issue:", error);
    return { success: false, error: "Failed to submit issue. Please try again." };
  }
};
