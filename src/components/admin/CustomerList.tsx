
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Mail, User, ExternalLink } from 'lucide-react';

type Customer = {
  id: string;
  full_name: string;
  email: string;
};

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList = ({ customers }: CustomerListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(customer => 
    customer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          {filteredCustomers.map(customer => (
            <div key={customer.id} className="bg-slate-800 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border border-slate-700 hover:border-indigo-800 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-900/50 p-2 rounded-full">
                  <User className="h-5 w-5 text-indigo-400" />
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
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none border-slate-700 text-indigo-300 hover:text-white hover:bg-indigo-700 hover:border-indigo-600">
                  <ExternalLink className="h-4 w-4 mr-1" /> View Details
                </Button>
              </div>
            </div>
          ))}
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

// Ensure we import the Users icon at the top
import { Users } from 'lucide-react';
