
import React, { memo } from 'react';
import { Search, Users } from 'lucide-react';

interface EmptyCustomerStateProps {
  searchTerm: string;
}

const EmptyCustomerState: React.FC<EmptyCustomerStateProps> = memo(({ searchTerm }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {searchTerm ? (
        <>
          <Search className="h-12 w-12 text-slate-500 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No customers found</h3>
          <p className="text-slate-400 max-w-md">
            We couldn't find any customers matching "{searchTerm}".
            Try a different search term or clear the search.
          </p>
        </>
      ) : (
        <>
          <Users className="h-12 w-12 text-slate-500 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No customers</h3>
          <p className="text-slate-400 max-w-md">
            There are no customers in the selected category.
            Try selecting a different status filter.
          </p>
        </>
      )}
    </div>
  );
});

EmptyCustomerState.displayName = 'EmptyCustomerState';

export default EmptyCustomerState;
