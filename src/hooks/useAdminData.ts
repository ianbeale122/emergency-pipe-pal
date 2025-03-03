
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

export type Customer = {
  id: string;
  full_name: string;
  email: string;
};

export const useAdminData = (isAuthenticated: boolean) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [documents, setDocuments] = useState<number>(0);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const { toast } = useToast();

  // Fetch customers and stats when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCustomers();
      fetchStats();
    }
  }, [isAuthenticated]);

  const fetchCustomers = async () => {
    setIsLoadingCustomers(true);
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('id, full_name, email')
        .order('full_name', { ascending: true });

      if (error) {
        throw error;
      }

      setCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        title: "Error",
        description: "Failed to load customers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingCustomers(false);
    }
  };

  const fetchStats = async () => {
    setIsLoadingStats(true);
    try {
      // Get document count
      const { count, error } = await supabase
        .from('customer_documents')
        .select('id', { count: 'exact', head: true });

      if (error) {
        throw error;
      }

      setDocuments(count || 0);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleUploadSuccess = () => {
    toast({
      title: "Upload successful",
      description: "Document has been uploaded successfully",
    });
    // Refresh statistics after upload
    fetchStats();
  };

  return {
    customers,
    documents,
    isLoadingCustomers,
    isLoadingStats,
    handleUploadSuccess,
    refreshData: () => {
      fetchCustomers();
      fetchStats();
    }
  };
};
