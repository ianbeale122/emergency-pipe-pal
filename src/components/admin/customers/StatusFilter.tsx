
import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Clock, XCircle, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { StatusFilterType } from './types';

interface StatusFilterProps {
  selectedStatus: StatusFilterType;
  onStatusChange: (status: StatusFilterType) => void;
  counts: {
    all: number;
    active: number;
    pending: number;
    inactive: number;
  };
}

const StatusFilter = memo(({ 
  selectedStatus, 
  onStatusChange,
  counts
}: StatusFilterProps) => {
  const statuses: {
    id: StatusFilterType;
    label: string;
    icon: React.ReactNode;
    count: number;
  }[] = [
    { id: 'all', label: 'All', icon: <Users className="h-4 w-4 mr-1 sm:mr-2" />, count: counts.all },
    { id: 'active', label: 'Active', icon: <BadgeCheck className="h-4 w-4 mr-1 sm:mr-2 text-green-500" />, count: counts.active },
    { id: 'pending', label: 'Pending', icon: <Clock className="h-4 w-4 mr-1 sm:mr-2 text-amber-500" />, count: counts.pending },
    { id: 'inactive', label: 'Inactive', icon: <XCircle className="h-4 w-4 mr-1 sm:mr-2 text-red-500" />, count: counts.inactive }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map(status => (
        <Button
          key={status.id}
          variant={selectedStatus === status.id ? "default" : "outline"}
          className={`${selectedStatus === status.id 
            ? "bg-indigo-600 hover:bg-indigo-700" 
            : "hover:bg-slate-800"} text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-9`}
          size="sm"
          onClick={() => onStatusChange(status.id)}
        >
          {status.icon}
          <span className="xs:inline">{status.label}</span>
          <Badge variant="secondary" className="ml-1 sm:ml-2 bg-slate-700 text-xs px-1.5 py-0">
            {status.count}
          </Badge>
        </Button>
      ))}
    </div>
  );
});

StatusFilter.displayName = 'StatusFilter';

export default StatusFilter;
