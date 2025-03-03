
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useAdminData } from "@/hooks/useAdminData";
import { Navigation } from "@/components/Navigation";
import AdminLoginContainer from "@/components/admin/AdminLoginContainer";
import AdminTabContent from "@/components/admin/AdminTabContent";
import AdminLoading from "@/components/admin/AdminLoading";

const AdminPortal = () => {
  const { isAuthenticated, isLoading, handleLogin, handleLogout } = useAdminAuth();
  const { 
    customers, 
    documents, 
    isLoadingCustomers, 
    isLoadingStats, 
    handleUploadSuccess 
  } = useAdminData(isAuthenticated);

  if (isLoading) {
    return <AdminLoading />;
  }

  if (!isAuthenticated) {
    return <AdminLoginContainer onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Portal</h1>
          <button 
            onClick={handleLogout}
            className="mt-2 sm:mt-0 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
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
