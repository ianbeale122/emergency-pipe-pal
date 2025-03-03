
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, FileCheck, Receipt, HelpCircle, Menu, User, Shield } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface PortalHeaderProps {
  userName: string | null;
  onLogout: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAdminClick?: () => void;
  isAdmin?: boolean;
}

const PortalHeader = ({ 
  userName, 
  onLogout, 
  activeTab, 
  onTabChange,
  onAdminClick,
  isAdmin 
}: PortalHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 flex items-center gap-2">
              {userName ? `${userName}'s Portal` : 'Customer Portal'}
              {isAdmin && (
                <Badge variant="outline" className="ml-2 bg-indigo-100 text-indigo-800 border-indigo-300">
                  <Shield className="h-3 w-3 mr-1" /> Admin
                </Badge>
              )}
            </h1>
            <p className="text-sm text-muted-foreground">Manage your certificates, invoices and access resources</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Button 
              onClick={onAdminClick} 
              variant="outline" 
              className="bg-indigo-100 hover:bg-indigo-200 border-indigo-300 text-indigo-800 hidden sm:flex"
            >
              <Shield className="h-4 w-4 mr-2 text-indigo-600" />
              Admin Portal
            </Button>
          )}
          
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
                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => {
                    onTabChange("profile");
                    setMenuOpen(false);
                  }}
                >
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </Button>
                
                {isAdmin && onAdminClick && (
                  <Button
                    variant="outline"
                    className="justify-start bg-indigo-100 hover:bg-indigo-200 border-indigo-300 text-indigo-800 mt-2"
                    onClick={() => {
                      onAdminClick();
                      setMenuOpen(false);
                    }}
                  >
                    <Shield className="h-5 w-5 mr-2 text-indigo-600" />
                    Admin Portal
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default PortalHeader;
