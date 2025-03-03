
import { Filter, UserCheck, UserMinus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusFilterType } from './types';

interface StatusFilterProps {
  filterStatus: StatusFilterType;
  setFilterStatus: (status: StatusFilterType) => void;
}

const StatusFilter = ({ filterStatus, setFilterStatus }: StatusFilterProps) => {
  return (
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
  );
};

export default StatusFilter;
