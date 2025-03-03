
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
      <Label htmlFor="customer">Customer</Label>
      <Select value={selectedCustomerId} onValueChange={onCustomerChange}>
        <SelectTrigger id="customer">
          <SelectValue placeholder="Select customer" />
        </SelectTrigger>
        <SelectContent>
          {customers.map((customer) => (
            <SelectItem key={customer.id} value={customer.id}>
              {customer.full_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomerSelector;
