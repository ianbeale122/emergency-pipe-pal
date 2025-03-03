
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Mail, User, ExternalLink, Calendar, MapPin, Phone } from 'lucide-react';

type Customer = {
  id: string;
  full_name: string;
  email: string;
};

// Mock customer extended data (in a real app, this would come from the database)
const customerExtendedData: Record<string, {
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
  }
};

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList = ({ customers }: CustomerListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);

  const filteredCustomers = customers.filter(customer => 
    customer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (customerId: string) => {
    setExpandedCustomer(expandedCustomer === customerId ? null : customerId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Users className="mr-2 h-6 w-6 text-indigo-500" />
          Customer Management
        </h2>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-indigo-400" />
        <Input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-slate-700 bg-slate-800 text-white placeholder:text-slate-400 focus:border-indigo-500"
        />
      </div>

      {filteredCustomers.length > 0 ? (
        <div className="grid gap-4">
          {filteredCustomers.map(customer => {
            const extendedData = customerExtendedData[customer.id] || {};
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
          <p className="text-indigo-300">Try adjusting your search term</p>
        </div>
      )}
    </div>
  );
};

export default CustomerList;

// Import additional icons we need
import { Users, Wrench } from 'lucide-react';
