
import React, { useState, useCallback, useMemo } from 'react';
import { Customer } from '@/hooks/useAdminData';
import CustomerCard from '@/components/admin/customers/CustomerCard';
import CustomerSearch from '@/components/admin/customers/CustomerSearch';
import StatusFilter from '@/components/admin/customers/StatusFilter';
import EmptyCustomerState from '@/components/admin/customers/EmptyCustomerState';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockCustomerExtendedData } from '@/components/admin/customers/customerMockData';

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
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

  const handleStatusChange = useCallback((status: string) => {
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

  // Memoized filtered customers to prevent unnecessary re-renders
  const filteredCustomers = useMemo(() => customers
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
    }), [customers, searchTerm, statusFilter, sortBy, sortDirection]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <CustomerSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

export default React.memo(CustomerList);
