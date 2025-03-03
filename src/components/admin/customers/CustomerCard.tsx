
import { User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CustomerDetails from './CustomerDetails';
import { Customer } from '@/hooks/useAdminData';
import { mockCustomerExtendedData } from './customerMockData';

interface CustomerCardProps {
  customer: Customer;
  expandedCustomer: string | null;
  toggleExpand: (customerId: string) => void;
}

const CustomerCard = ({ customer, expandedCustomer, toggleExpand }: CustomerCardProps) => {
  const extendedData = mockCustomerExtendedData[customer.id] || {};
  const isExpanded = expandedCustomer === customer.id;
  
  return (
    <div 
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
      
      <CustomerDetails 
        extendedData={extendedData} 
        isExpanded={isExpanded} 
      />
    </div>
  );
};

export default CustomerCard;
