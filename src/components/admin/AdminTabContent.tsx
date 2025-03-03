
import React, { useEffect, useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerList from "@/components/admin/CustomerList";
import DocumentUpload from "@/components/admin/DocumentUpload";
import DashboardOverview from "@/components/admin/dashboard/DashboardOverview";
import { Customer } from "@/hooks/useAdminData";
import { LayoutDashboard, Users, Upload } from "lucide-react";
import CustomerSearch from "@/components/admin/customers/CustomerSearch";

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
  const [globalSearch, setGlobalSearch] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(customers);

  // Handle tab change from URL if needed
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab && ["dashboard", "customers", "upload"].includes(tab)) {
      setActiveTab(tab);
    }
  }, []);

  // Filter customers when search term or customers list changes
  useEffect(() => {
    if (globalSearch.trim() === '') {
      setFilteredCustomers(customers);
    } else {
      const searchTerm = globalSearch.toLowerCase();
      const filtered = customers.filter(
        customer => 
          customer.full_name.toLowerCase().includes(searchTerm) || 
          customer.email.toLowerCase().includes(searchTerm)
      );
      setFilteredCustomers(filtered);
      
      // If we have search results and we're not on the customers tab, switch to it
      if (filtered.length > 0 && activeTab !== "customers" && globalSearch.length > 2) {
        handleTabChange("customers");
      }
    }
  }, [globalSearch, customers]);

  // Update URL when tab changes
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("tab", value);
    window.history.pushState({}, "", newUrl);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-lg shadow-md p-4 border border-indigo-900/20">
        <CustomerSearch 
          searchTerm={globalSearch} 
          setSearchTerm={setGlobalSearch} 
          placeholder="Search customers..." 
        />
        <div className="text-xs text-slate-500 mt-2">
          {globalSearch && filteredCustomers.length > 0 && (
            <span>Found {filteredCustomers.length} results</span>
          )}
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/70 border border-indigo-900/20 p-1 rounded-lg text-slate-200 shadow-md">
          <TabsTrigger 
            value="dashboard" 
            className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-2 md:py-3 flex items-center justify-center gap-1 md:gap-2 text-xs sm:text-sm"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden xs:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger 
            value="customers" 
            className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-2 md:py-3 flex items-center justify-center gap-1 md:gap-2 text-xs sm:text-sm"
          >
            <Users className="h-4 w-4" />
            <span className="hidden xs:inline">Customers</span> 
            {globalSearch && filteredCustomers.length > 0 && (
              <span className="ml-1 text-xs bg-indigo-800 px-1.5 py-0.5 rounded-full">
                {filteredCustomers.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="upload" 
            className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white py-2 md:py-3 flex items-center justify-center gap-1 md:gap-2 text-xs sm:text-sm"
          >
            <Upload className="h-4 w-4" />
            <span className="hidden xs:inline">Upload</span>
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
        
        <TabsContent value="customers" className="bg-slate-900 rounded-lg shadow-lg p-4 sm:p-6 text-white border border-indigo-900/20">
          <CustomerList 
            customers={filteredCustomers} 
            isLoading={isLoadingCustomers} 
          />
        </TabsContent>
        
        <TabsContent value="upload" className="bg-slate-900 rounded-lg shadow-lg border border-indigo-900/20">
          <DocumentUpload 
            customers={globalSearch ? filteredCustomers : customers} 
            onUploadSuccess={onUploadSuccess} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default React.memo(AdminTabContent);
