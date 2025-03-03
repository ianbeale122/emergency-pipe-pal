
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import CustomerList from "@/components/admin/CustomerList";
import DocumentUpload from "@/components/admin/DocumentUpload";
import DashboardOverview from "@/components/admin/dashboard/DashboardOverview";
import { Customer } from "@/hooks/useAdminData";

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
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("tab", value);
    window.history.pushState({}, "", newUrl);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
      <TabsList className="grid w-full grid-cols-3 bg-slate-700 text-slate-200">
        <TabsTrigger value="dashboard" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white">Dashboard</TabsTrigger>
        <TabsTrigger value="customers" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white">Customers</TabsTrigger>
        <TabsTrigger value="upload" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white">Upload Documents</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard">
        <DashboardOverview
          customerCount={customers.length}
          documentCount={documentCount}
          isLoadingStats={isLoadingStats}
          onChangeTab={handleTabChange}
        />
      </TabsContent>
      
      <TabsContent value="customers" className="bg-slate-800 rounded-lg shadow p-6 text-white">
        {isLoadingCustomers ? (
          <div className="text-center py-8">Loading customers...</div>
        ) : (
          <CustomerList customers={customers} />
        )}
      </TabsContent>
      
      <TabsContent value="upload" className="bg-slate-800 rounded-lg shadow">
        <DocumentUpload 
          customers={customers} 
          onUploadSuccess={onUploadSuccess} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabContent;
