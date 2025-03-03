
import React, { useState, useCallback, useMemo } from 'react';
import { Customer } from '@/hooks/useAdminData';
import CustomerCard from '@/components/admin/customers/CustomerCard';
import CustomerSearch from '@/components/admin/customers/CustomerSearch';
import StatusFilter from '@/components/admin/customers/StatusFilter';
import EmptyCustomerState from '@/components/admin/customers/EmptyCustomerState';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockCustomerExtendedData } from '@/components/admin/customers/customerMockData';
import { StatusFilterType } from '@/components/admin/customers/types';

interface CustomerListProps {
  customers: Customer[];
  isLoading?: boolean;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);

  // Count customers by status - memoized to prevent unnecessary recalculations
  const countByStatus = useMemo(() => ({
    all: customers.length,
    active: customers.filter(c => mockCustomerExtendedData[c.id]?.status === 'active').length,
    pending: customers.filter(c => mockCustomerExtendedData[c.id]?.status === 'pending').length,
    inactive: customers.filter(c => mockCustomerExtendedData[c.id]?.status === 'inactive').length,
  }), [customers]);

  const toggleExpand = useCallback((customerId: string) => {
    setExpandedCustomer(prev => prev === customerId ? null : customerId);
  }, []);

  const handleStatusChange = useCallback((status: StatusFilterType) => {
    setStatusFilter(status);
  }, []);

  const handleSort = useCallback((field: string) => {
    if (sortBy === field) {
      // Toggle direction if clicking the same field
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to ascending
      setSortBy(field);
      setSortDirection('asc');
    }
  }, [sortBy]);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  // Memoized filtered customers to prevent unnecessary re-renders
  const filteredCustomers = useMemo(() => {
    if (isLoading) return [];
    
    return customers
      .filter(customer => {
        // Filter by search term
        const searchMatch = 
          customer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Filter by status using the mock data
        const customerStatus = mockCustomerExtendedData[customer.id]?.status;
        const statusMatch = statusFilter === 'all' || customerStatus === statusFilter;
        
        return searchMatch && statusMatch;
      })
      .sort((a, b) => {
        const direction = sortDirection === 'asc' ? 1 : -1;
        
        switch(sortBy) {
          case 'name':
            return a.full_name.localeCompare(b.full_name) * direction;
          case 'email':
            return a.email.localeCompare(b.email) * direction;
          case 'date':
            // Use joined date from mock data
            const dateA = mockCustomerExtendedData[a.id]?.joinDate || '';
            const dateB = mockCustomerExtendedData[b.id]?.joinDate || '';
            return (new Date(dateA).getTime() - new Date(dateB).getTime()) * direction;
          default:
            return 0;
        }
      });
  }, [customers, searchTerm, statusFilter, sortBy, sortDirection, isLoading]);

  // Show a loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-50 pointer-events-none">
          <div className="relative flex-grow h-10 bg-slate-800 rounded-md animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-10 w-28 bg-slate-800 rounded-md animate-pulse"></div>
            <div className="h-10 w-28 bg-slate-800 rounded-md animate-pulse"></div>
            <div className="h-10 w-28 bg-slate-800 rounded-md animate-pulse"></div>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div 
              key={item} 
              className="bg-slate-800/50 rounded-lg p-6 h-48 animate-pulse shadow-md border border-slate-700/30"
            >
              <div className="w-3/4 h-5 bg-slate-700 rounded mb-4"></div>
              <div className="w-1/2 h-4 bg-slate-700 rounded mb-2"></div>
              <div className="w-2/3 h-4 bg-slate-700 rounded mb-4"></div>
              <div className="w-1/3 h-6 bg-slate-700 rounded-md mt-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <CustomerSearch searchTerm={searchTerm} setSearchTerm={handleSearchChange} />
        <StatusFilter 
          selectedStatus={statusFilter} 
          onStatusChange={handleStatusChange} 
          counts={countByStatus} 
        />
      </div>
      
      <div className="flex justify-end space-x-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSort('name')}
          className={`text-sm ${sortBy === 'name' ? 'bg-indigo-900/30' : ''}`}
        >
          Name
          {sortBy === 'name' && <ArrowUpDown className="ml-2 h-3 w-3" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSort('email')}
          className={`text-sm ${sortBy === 'email' ? 'bg-indigo-900/30' : ''}`}
        >
          Email
          {sortBy === 'email' && <ArrowUpDown className="ml-2 h-3 w-3" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSort('date')}
          className={`text-sm ${sortBy === 'date' ? 'bg-indigo-900/30' : ''}`}
        >
          Join Date
          {sortBy === 'date' && <ArrowUpDown className="ml-2 h-3 w-3" />}
        </Button>
      </div>
      
      {filteredCustomers.length === 0 ? (
        <EmptyCustomerState searchTerm={searchTerm} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 transition-all">
          {filteredCustomers.map(customer => (
            <CustomerCard 
              key={customer.id} 
              customer={customer} 
              expandedCustomer={expandedCustomer}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
};

CustomerList.displayName = 'CustomerList';

export default React.memo(CustomerList);
