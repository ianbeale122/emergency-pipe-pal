
import { User } from 'lucide-react';

const EmptyCustomerState = () => {
  return (
    <div className="text-center py-10">
      <User className="h-12 w-12 mx-auto text-indigo-400 opacity-30 mb-4" />
      <h3 className="text-lg font-medium text-white">No customers found</h3>
      <p className="text-indigo-300">Try adjusting your search term or filters</p>
    </div>
  );
};

export default EmptyCustomerState;
