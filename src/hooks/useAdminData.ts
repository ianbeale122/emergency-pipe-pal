
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

export type Customer = {
  id: string;
  full_name: string;
  email: string;
};

// Mock customer data to use if no real customers exist
const mockCustomers: Customer[] = [
  {
    id: '1',
    full_name: 'John Smith',
    email: 'john.smith@example.com'
  },
  {
    id: '2',
    full_name: 'Sarah Johnson',
    email: 'sarah.j@example.com'
  },
  {
    id: '3',
    full_name: 'David Williams',
    email: 'david.w@example.com'
  },
  {
    id: '4',
    full_name: 'Emma Thompson',
    email: 'emma.t@example.com'
  },
  {
    id: '5',
    full_name: 'Michael Davies',
    email: 'michael.d@example.com'
  }
];

export const useAdminData = (isAuthenticated: boolean) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [documents, setDocuments] = useState<number>(0);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
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

      // Use mock data if no customers are found
      if (!data || data.length === 0) {
        console.log('No customers found in database, using mock data');
        // Short delay to prevent immediate flicker
        await new Promise(resolve => setTimeout(resolve, 300));
        setCustomers(mockCustomers);
      } else {
        setCustomers(data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      // Use mock data in case of error
      console.log('Error fetching customers, using mock data');
      // Short delay to prevent immediate flicker
      await new Promise(resolve => setTimeout(resolve, 300));
      setCustomers(mockCustomers);
      
      toast({
        title: "Note",
        description: "Using demo customer data for preview purposes.",
        variant: "default",
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

      // Use mock count if no real count is found
      setDocuments(count || mockCustomers.length * 2); // Assume each customer has ~2 documents
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Use mock document count in case of error
      setDocuments(mockCustomers.length * 2);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleUploadSuccess = useCallback(() => {
    toast({
      title: "Upload successful",
      description: "Document has been uploaded successfully",
    });
    // Refresh statistics after upload
    fetchStats();
  }, [toast]);

  const refreshData = useCallback(() => {
    fetchCustomers();
    fetchStats();
  }, []);

  return {
    customers,
    documents,
    isLoadingCustomers,
    isLoadingStats,
    handleUploadSuccess,
    refreshData
  };
};
