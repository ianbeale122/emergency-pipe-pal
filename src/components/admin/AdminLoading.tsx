
import React from 'react';

const AdminLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Loading admin panel...</p>
      </div>
    </div>
  );
};

export default AdminLoading;
