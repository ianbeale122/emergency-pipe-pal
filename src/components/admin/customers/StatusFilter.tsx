
import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Clock, XCircle, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface StatusFilterProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  counts: {
    all: number;
    active: number;
    pending: number;
    inactive: number;
  };
}

const StatusFilter: React.FC<StatusFilterProps> = memo(({ 
  selectedStatus, 
  onStatusChange,
  counts
}) => {
  const statuses = [
    { id: 'all', label: 'All Customers', icon: <Users className="h-4 w-4 mr-2" />, count: counts.all },
    { id: 'active', label: 'Active', icon: <BadgeCheck className="h-4 w-4 mr-2 text-green-500" />, count: counts.active },
    { id: 'pending', label: 'Pending', icon: <Clock className="h-4 w-4 mr-2 text-amber-500" />, count: counts.pending },
    { id: 'inactive', label: 'Inactive', icon: <XCircle className="h-4 w-4 mr-2 text-red-500" />, count: counts.inactive }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map(status => (
        <Button
          key={status.id}
          variant={selectedStatus === status.id ? "default" : "outline"}
          className={selectedStatus === status.id 
            ? "bg-indigo-600 hover:bg-indigo-700" 
            : "hover:bg-slate-800"
          }
          size="sm"
          onClick={() => onStatusChange(status.id)}
        >
          {status.icon}
          {status.label}
          <Badge variant="secondary" className="ml-2 bg-slate-700 text-xs">
            {status.count}
          </Badge>
        </Button>
      ))}
    </div>
  );
});

StatusFilter.displayName = 'StatusFilter';

export default StatusFilter;
