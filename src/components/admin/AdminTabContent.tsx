
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
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="customers">Customers</TabsTrigger>
        <TabsTrigger value="upload">Upload Documents</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard">
        <DashboardOverview
          customerCount={customers.length}
          documentCount={documentCount}
          isLoadingStats={isLoadingStats}
          onChangeTab={handleTabChange}
        />
      </TabsContent>
      
      <TabsContent value="customers" className="bg-white rounded-lg shadow p-6">
        {isLoadingCustomers ? (
          <div className="text-center py-8">Loading customers...</div>
        ) : (
          <CustomerList customers={customers} />
        )}
      </TabsContent>
      
      <TabsContent value="upload" className="bg-white rounded-lg shadow">
        <DocumentUpload 
          customers={customers} 
          onUploadSuccess={onUploadSuccess} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabContent;
