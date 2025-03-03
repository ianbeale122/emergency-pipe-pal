
import React, { memo, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';

interface CustomerSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
}

const CustomerSearch: React.FC<CustomerSearchProps> = memo(({ 
  searchTerm, 
  setSearchTerm, 
  placeholder = "Search by name or email..." 
}) => {
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, [setSearchTerm]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm]);

  return (
    <div className="relative flex-grow">
      <Search className="absolute left-3 top-3 h-4 w-4 text-indigo-400 pointer-events-none" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        className="pl-10 border-slate-700 bg-slate-800 text-white placeholder:text-slate-400 focus:border-indigo-500 pr-10"
      />
      {searchTerm && (
        <button 
          onClick={handleClearSearch}
          className="absolute right-3 top-3 text-slate-400 hover:text-white transition-colors"
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
