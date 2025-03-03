
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, FileCheck, Receipt, HelpCircle, Menu } from "lucide-react";
import { useState } from "react";

interface PortalHeaderProps {
  userName: string | null;
  onLogout: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const PortalHeader = ({ userName, onLogout, activeTab, onTabChange }: PortalHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
            {userName ? `${userName}'s Portal` : 'Customer Portal'}
          </h1>
          <p className="text-sm text-muted-foreground">Manage your certificates, invoices and access resources</p>
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
              <div className="flex flex-col gap-4">
                <Button
                  variant={activeTab === "dashboard" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => {
                    onTabChange("dashboard");
                    setMenuOpen(false);
                  }}
                >
                  <Home className="h-5 w-5 mr-2" />
                  Dashboard
                </Button>
                <Button
                  variant={activeTab === "certificates" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => {
                    onTabChange("certificates");
                    setMenuOpen(false);
                  }}
                >
                  <FileCheck className="h-5 w-5 mr-2" />
                  Certificates
                </Button>
                <Button
                  variant={activeTab === "invoices" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => {
                    onTabChange("invoices");
                    setMenuOpen(false);
                  }}
                >
                  <Receipt className="h-5 w-5 mr-2" />
                  Invoices
                </Button>
                <Button
                  variant={activeTab === "faq" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => {
                    onTabChange("faq");
                    setMenuOpen(false);
                  }}
                >
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Video Tutorials
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default PortalHeader;
