
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CustomerSelectorProps {
  customers: { id: string; full_name: string }[];
  selectedCustomerId: string;
  onCustomerChange: (customerId: string) => void;
}

const CustomerSelector: React.FC<CustomerSelectorProps> = ({ 
  customers, 
  selectedCustomerId, 
  onCustomerChange 
}) => {
  return (
    <div>
      <Label htmlFor="customer" className="text-indigo-300">Customer</Label>
      <Select value={selectedCustomerId} onValueChange={onCustomerChange}>
        <SelectTrigger id="customer" className="bg-slate-800 border-slate-700 text-white">
          <SelectValue placeholder="Select customer" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border border-slate-700 text-white">
          {customers.map((customer) => (
            <SelectItem 
              key={customer.id} 
              value={customer.id}
              className="text-white hover:bg-slate-700 focus:bg-slate-700"
            >
              {customer.full_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomerSelector;
