
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCheck, HelpCircle, Home, Receipt } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type PortalTabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
};

const PortalTabs = ({ activeTab, onTabChange, children }: PortalTabsProps) => {
  const tabsListRef = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);

  // Check if tabs are scrollable
  useEffect(() => {
    const checkScroll = () => {
      if (tabsListRef.current) {
        setScrollable(
          tabsListRef.current.scrollWidth > tabsListRef.current.clientWidth
        );
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <div className="relative">
        <TabsList 
          ref={tabsListRef}
          className="mb-4 flex whitespace-nowrap p-1 w-full overflow-x-auto scrollbar-hide"
        >
          <TabsTrigger value="dashboard" className="flex items-center gap-2 min-w-max">
            <Home className="h-4 w-4" />
            <span className="hidden xs:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="certificates" className="flex items-center gap-2 min-w-max">
            <FileCheck className="h-4 w-4" />
            <span className="hidden xs:inline">Certificates</span>
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center gap-2 min-w-max">
            <Receipt className="h-4 w-4" />
            <span className="hidden xs:inline">Invoices</span>
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2 min-w-max">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden xs:inline">Video Tutorials</span>
          </TabsTrigger>
        </TabsList>
        
        {scrollable && (
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent" />
        )}
      </div>
      
      {children}
    </Tabs>
  );
};

export default PortalTabs;
