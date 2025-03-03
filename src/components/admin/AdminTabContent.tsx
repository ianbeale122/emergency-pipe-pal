
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState, useCallback } from "react";
import CustomerList from "@/components/admin/CustomerList";
import DocumentUpload from "@/components/admin/DocumentUpload";
import DashboardOverview from "@/components/admin/dashboard/DashboardOverview";
import { Customer } from "@/hooks/useAdminData";
import { LayoutDashboard, Users, Upload } from "lucide-react";

interface AdminTabContentProps {
  customers: Customer[];
  documentCount: number;
  isLoadingCustomers: boolean;
  isLoadingStats: boolean;
  onUploadSuccess: () => void;
}

const AdminTabContent = ({
  customers,
  documentCount,
  isLoadingCustomers,
  isLoadingStats,
  onUploadSuccess
}: AdminTabContentProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Handle tab change from URL if needed
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab && ["dashboard", "customers", "upload"].includes(tab)) {
      setActiveTab(tab);
    }
  }, []);

  // Update URL when tab changes
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("tab", value);
    window.history.pushState({}, "", newUrl);
  }, []);

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
      <TabsList className="grid w-full grid-cols-3 bg-slate-800/70 border border-indigo-900/20 p-1 rounded-lg text-slate-200 shadow-md">
        <TabsTrigger 
          value="dashboard" 
          className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-3 flex items-center justify-center gap-2"
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </TabsTrigger>
        <TabsTrigger 
          value="customers" 
          className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-3 flex items-center justify-center gap-2"
        >
          <Users className="h-4 w-4" />
          Customers
        </TabsTrigger>
        <TabsTrigger 
          value="upload" 
          className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-3 flex items-center justify-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload Documents
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard">
        <DashboardOverview
          customerCount={customers.length}
          documentCount={documentCount}
          isLoadingStats={isLoadingStats}
          onChangeTab={handleTabChange}
        />
      </TabsContent>
      
      <TabsContent value="customers" className="bg-slate-900 rounded-lg shadow-lg p-6 text-white border border-indigo-900/20">
        {isLoadingCustomers ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-indigo-300">Loading customers...</p>
          </div>
        ) : (
          <CustomerList customers={customers} />
        )}
      </TabsContent>
      
      <TabsContent value="upload" className="bg-slate-900 rounded-lg shadow-lg border border-indigo-900/20">
        <DocumentUpload 
          customers={customers} 
          onUploadSuccess={onUploadSuccess} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default React.memo(AdminTabContent);
