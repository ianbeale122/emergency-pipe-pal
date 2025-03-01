
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCheck, HelpCircle, Home, Receipt } from "lucide-react";

type PortalTabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
};

const PortalTabs = ({ activeTab, onTabChange, children }: PortalTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="mb-4 overflow-x-auto flex whitespace-nowrap p-1 w-full max-w-3xl">
        <TabsTrigger value="dashboard" className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          <span>Dashboard</span>
        </TabsTrigger>
        <TabsTrigger value="certificates" className="flex items-center gap-2">
          <FileCheck className="h-4 w-4" />
          <span>Certificates</span>
        </TabsTrigger>
        <TabsTrigger value="invoices" className="flex items-center gap-2">
          <Receipt className="h-4 w-4" />
          <span>Invoices</span>
        </TabsTrigger>
        <TabsTrigger value="faq" className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          <span>Video Tutorials</span>
        </TabsTrigger>
      </TabsList>
      
      {children}
    </Tabs>
  );
};

export default PortalTabs;
