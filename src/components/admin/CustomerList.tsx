import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Mail, User, ExternalLink, Calendar, MapPin, Phone, Users, Wrench, UserCheck, UserMinus, UserPlus, Filter, X } from 'lucide-react';

type Customer = {
  id: string;
  full_name: string;
  email: string;
};

// Enhanced mock customer data with more entries
const mockCustomerExtendedData: Record<string, {
  phone?: string;
  address?: string;
  joinDate?: string;
  status?: 'active' | 'inactive';
  lastService?: string;
}> = {
  '1': {
    phone: '07700 900123',
    address: '123 Oak Street, London',
    joinDate: '2022-05-15',
    status: 'active',
    lastService: '2023-11-10'
  },
  '2': {
    phone: '07700 900456',
    address: '45 Maple Avenue, Manchester',
    joinDate: '2021-08-22',
    status: 'active',
    lastService: '2023-12-05'
  },
  '3': {
    phone: '07700 900789',
    address: '78 Pine Road, Birmingham',
    joinDate: '2023-01-30',
    status: 'inactive',
    lastService: '2023-09-18'
  },
  '4': {
    phone: '07700 900321',
    address: '12 Cedar Lane, Glasgow',
    joinDate: '2022-11-05',
    status: 'active',
    lastService: '2024-01-20'
  },
  '5': {
    phone: '07700 900654',
    address: '67 Willow Drive, Cardiff',
    joinDate: '2023-04-12',
    status: 'active',
    lastService: '2024-02-15'
  },
  '6': {
    phone: '07700 900987',
    address: '34 Elm Court, Edinburgh',
    joinDate: '2023-06-18',
    status: 'active',
    lastService: '2024-03-05'
  },
  '7': {
    phone: '07700 900234',
    address: '90 Birch Road, Bristol',
    joinDate: '2022-03-25',
    status: 'inactive',
    lastService: '2023-08-12'
  },
  '8': {
    phone: '07700 900567',
    address: '56 Ash Avenue, Liverpool',
    joinDate: '2021-12-10',
    status: 'active',
    lastService: '2024-01-08'
  },
  '9': {
    phone: '07700 900890',
    address: '23 Spruce Street, Newcastle',
    joinDate: '2023-09-05',
    status: 'active',
    lastService: '2024-02-28'
  },
  '10': {
    phone: '07700 900432',
    address: '78 Fir Close, Belfast',
    joinDate: '2022-08-15',
    status: 'inactive',
    lastService: '2023-11-22'
  },
  '11': {
    phone: '07700 900765',
    address: '45 Sycamore Lane, Leeds',
    joinDate: '2023-02-18',
    status: 'active',
    lastService: '2024-03-10'
  },
  '12': {
    phone: '07700 900098',
    address: '12 Cherry Way, Sheffield',
    joinDate: '2021-11-30',
    status: 'active',
    lastService: '2024-01-15'
  }
};

// Enhanced mock customer list with more entries
const mockCustomers: Customer[] = [
  { id: '1', full_name: 'John Smith', email: 'john.smith@example.com' },
  { id: '2', full_name: 'Sarah Johnson', email: 'sarah.j@example.com' },
  { id: '3', full_name: 'David Williams', email: 'david.w@example.com' },
  { id: '4', full_name: 'Emma Thompson', email: 'emma.t@example.com' },
  { id: '5', full_name: 'Michael Davies', email: 'michael.d@example.com' },
  { id: '6', full_name: 'Rebecca Wilson', email: 'rebecca.w@example.com' },
  { id: '7', full_name: 'Thomas Brown', email: 'thomas.b@example.com' },
  { id: '8', full_name: 'Jessica Taylor', email: 'jessica.t@example.com' },
  { id: '9', full_name: 'Daniel Evans', email: 'daniel.e@example.com' },
  { id: '10', full_name: 'Olivia Roberts', email: 'olivia.r@example.com' },
  { id: '11', full_name: 'James Martin', email: 'james.m@example.com' },
  { id: '12', full_name: 'Sophie White', email: 'sophie.w@example.com' }
];

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList = ({ customers }: CustomerListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

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

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Users className="mr-2 h-6 w-6 text-indigo-500" />
          Customer Management
        </h2>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-indigo-400" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-slate-700 bg-slate-800 text-white placeholder:text-slate-400 focus:border-indigo-500 pr-10"
          />
          {searchTerm && (
            <button 
              onClick={handleClearSearch}
              className="absolute right-3 top-3 text-slate-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-indigo-400" />
          <div className="flex rounded-md overflow-hidden">
            <Button
              variant="outline"
              size="sm"
              className={`${filterStatus === 'all' ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-300'} border-slate-700 rounded-none rounded-l-md`}
              onClick={() => setFilterStatus('all')}
            >
              All
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`${filterStatus === 'active' ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-300'} border-slate-700 border-l-0 rounded-none`}
              onClick={() => setFilterStatus('active')}
            >
              <UserCheck className="mr-1 h-4 w-4" />
              Active
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`${filterStatus === 'inactive' ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-300'} border-slate-700 border-l-0 rounded-none rounded-r-md`}
              onClick={() => setFilterStatus('inactive')}
            >
              <UserMinus className="mr-1 h-4 w-4" />
              Inactive
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-4 text-sm text-indigo-300">
        <p>Showing {filteredCustomers.length} of {customerData.length} customers</p>
      </div>

      {filteredCustomers.length > 0 ? (
        <div className="grid gap-4">
          {filteredCustomers.map(customer => {
            const extendedData = mockCustomerExtendedData[customer.id] || {};
            const isExpanded = expandedCustomer === customer.id;
            
            return (
              <div 
                key={customer.id} 
                className={`bg-slate-800 rounded-lg p-4 border ${isExpanded ? 'border-indigo-500' : 'border-slate-700'} hover:border-indigo-800 transition-colors`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${extendedData.status === 'active' ? 'bg-indigo-900/50' : 'bg-slate-700'}`}>
                      <User className={`h-5 w-5 ${extendedData.status === 'active' ? 'text-indigo-400' : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{customer.full_name}</h3>
                      <div className="flex items-center text-sm text-slate-400">
                        <Mail className="h-3 w-3 mr-1" />
                        {customer.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 sm:flex-none border-slate-700 text-indigo-300 hover:text-white hover:bg-indigo-700 hover:border-indigo-600"
                      onClick={() => toggleExpand(customer.id)}
                    >
                      {isExpanded ? 'Hide Details' : 'View Details'}
                    </Button>
                  </div>
                </div>
                
                {isExpanded && extendedData && (
                  <div className="mt-4 pt-4 border-t border-slate-700 grid gap-3 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {extendedData.phone && (
                        <div className="flex items-center text-slate-300">
                          <Phone className="h-4 w-4 mr-2 text-indigo-400" />
                          <span>Phone: {extendedData.phone}</span>
                        </div>
                      )}
                      {extendedData.address && (
                        <div className="flex items-center text-slate-300">
                          <MapPin className="h-4 w-4 mr-2 text-indigo-400" />
                          <span>Address: {extendedData.address}</span>
                        </div>
                      )}
                      {extendedData.joinDate && (
                        <div className="flex items-center text-slate-300">
                          <Calendar className="h-4 w-4 mr-2 text-indigo-400" />
                          <span>Customer since: {new Date(extendedData.joinDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      {extendedData.lastService && (
                        <div className="flex items-center text-slate-300">
                          <Wrench className="h-4 w-4 mr-2 text-indigo-400" />
                          <span>Last service: {new Date(extendedData.lastService).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-blue-700/30 bg-blue-900/20 text-blue-300 hover:bg-blue-900/30"
                      >
                        Services History
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-purple-700/30 bg-purple-900/20 text-purple-300 hover:bg-purple-900/30"
                      >
                        Edit Details
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10">
          <User className="h-12 w-12 mx-auto text-indigo-400 opacity-30 mb-4" />
          <h3 className="text-lg font-medium text-white">No customers found</h3>
          <p className="text-indigo-300">Try adjusting your search term or filters</p>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
