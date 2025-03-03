
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useAdminData } from "@/hooks/useAdminData";
import { Navigation } from "@/components/Navigation";
import AdminLoginContainer from "@/components/admin/AdminLoginContainer";
import AdminTabContent from "@/components/admin/AdminTabContent";
import AdminLoading from "@/components/admin/AdminLoading";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminPortal = () => {
  const { isAuthenticated, isLoading, handleLogin, handleLogout } = useAdminAuth();
  const { 
    customers, 
    documents, 
    isLoadingCustomers, 
    isLoadingStats, 
    handleUploadSuccess, 
    refreshData
  } = useAdminData(isAuthenticated);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Ensure we're on the /admin route when accessing the admin portal
  useEffect(() => {
    if (location.pathname !== '/admin' && isAuthenticated) {
      navigate('/admin');
    }
  }, [location.pathname, isAuthenticated, navigate]);

  // Refresh data when authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated, refreshData]);

  console.log("Admin authentication state:", { isAuthenticated, isLoading });

  if (isLoading) {
    return <AdminLoading />;
  }

  if (!isAuthenticated) {
    return <AdminLoginContainer onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="bg-slate-950 border-b border-indigo-900/30 shadow-lg">
        <Navigation />
      </div>
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 mb-16 md:mb-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8 bg-slate-900/70 p-3 sm:p-6 rounded-lg shadow-md border border-indigo-900/20">
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-white">Admin Portal</h1>
            <p className="text-indigo-400 mt-1 text-sm sm:text-base">System Management Interface</p>
          </div>
          <button 
            onClick={handleLogout}
            className="mt-4 sm:mt-0 px-3 sm:px-5 py-1.5 sm:py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-md text-sm"
          >
            Logout
          </button>
        </div>

        <AdminTabContent
          customers={customers}
          documentCount={documents}
          isLoadingCustomers={isLoadingCustomers}
          isLoadingStats={isLoadingStats}
          onUploadSuccess={handleUploadSuccess}
        />
      </div>
    </div>
  );
};

export default AdminPortal;
