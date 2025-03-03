
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserProfile } from "@/api/portal";

interface PortalHeaderProps {
  userProfile: UserProfile | null;
  onLogout: () => Promise<void>;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const PortalHeader = ({ 
  userProfile, 
  onLogout, 
  menuOpen, 
  setMenuOpen,
  activeTab,
  setActiveTab
}: PortalHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
            {userProfile?.full_name ? `${userProfile.full_name}'s Portal` : 'Customer Portal'}
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your certificates, invoices and access resources
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onLogout}>
            Log out
          </Button>
          
          {/* Mobile menu button */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild className="sm:hidden">
              <Button variant="outline" size="icon" className="shadow-sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] pt-12">
              <MobileMenu 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                setMenuOpen={setMenuOpen} 
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

interface MobileMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setMenuOpen: (open: boolean) => void;
}

const MobileMenu = ({ activeTab, setActiveTab, setMenuOpen }: MobileMenuProps) => {
  const { Home, FileCheck, Receipt, HelpCircle } = require("lucide-react");
  
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "certificates", label: "Certificates", icon: FileCheck },
    { id: "invoices", label: "Invoices", icon: Receipt },
    { id: "faq", label: "Video Tutorials", icon: HelpCircle }
  ];
  
  return (
    <div className="flex flex-col gap-4">
      {menuItems.map(item => (
        <Button
          key={item.id}
          variant={activeTab === item.id ? "default" : "ghost"}
          className="justify-start"
          onClick={() => {
            setActiveTab(item.id);
            setMenuOpen(false);
          }}
        >
          <item.icon className="h-5 w-5 mr-2" />
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default PortalHeader;
