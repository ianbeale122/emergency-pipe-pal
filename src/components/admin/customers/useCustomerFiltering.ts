
import { useState, useMemo } from 'react';
import { Customer, StatusFilterType } from './types';
import { mockCustomerExtendedData, mockCustomers } from './customerMockData';

export const useCustomerFiltering = (customers: Customer[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<StatusFilterType>('all');

  // Use the provided customers list if available, otherwise fall back to mock data
  const customerData = customers.length > 0 ? customers : mockCustomers;

  // Memoized filtered customers based on search term and filter status
  const filteredCustomers = useMemo(() => {
    return customerData.filter(customer => {
      const matchesSearch = 
        customer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterStatus === 'all') return matchesSearch;
      
      const extendedData = mockCustomerExtendedData[customer.id];
      const matchesStatus = extendedData?.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [customerData, searchTerm, filterStatus]);

  const toggleExpand = (customerId: string) => {
    setExpandedCustomer(expandedCustomer === customerId ? null : customerId);
  };

  return {
    searchTerm,
    setSearchTerm,
    expandedCustomer,
    filterStatus,
    setFilterStatus,
    filteredCustomers,
    customerData,
    toggleExpand
  };
};
