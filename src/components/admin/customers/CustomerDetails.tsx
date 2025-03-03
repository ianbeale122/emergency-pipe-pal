
import React, { memo } from 'react';
import { Phone, MapPin, Calendar, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomerExtendedData } from './types';

interface CustomerDetailsProps {
  extendedData: CustomerExtendedData;
  isExpanded: boolean;
}

const CustomerDetails = memo(({ extendedData, isExpanded }: CustomerDetailsProps) => {
  if (!isExpanded) {
    return null;
  }

  return (
    <div className="mt-4 pt-4 border-t border-slate-700 grid gap-3 text-sm animate-in fade-in-50 duration-200">
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
  );
});

CustomerDetails.displayName = 'CustomerDetails';

export default CustomerDetails;
