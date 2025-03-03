
import React, { memo } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface CustomerSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const CustomerSearch: React.FC<CustomerSearchProps> = memo(({ searchTerm, setSearchTerm }) => {
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
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
  );
});

CustomerSearch.displayName = 'CustomerSearch';

export default CustomerSearch;
