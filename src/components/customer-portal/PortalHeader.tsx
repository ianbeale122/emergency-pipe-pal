
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserProfile } from "@/api/portal";
import { Menu, LogOut, Settings, User, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { checkIsAdmin } from "@/api/portal";

interface PortalHeaderProps {
  userProfile: UserProfile | null;
  onLogout: () => Promise<void>;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const PortalHeader = ({ userProfile, onLogout, menuOpen, setMenuOpen, activeTab, setActiveTab }: PortalHeaderProps) => {
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (userProfile?.user_id) {
        const adminStatus = await checkIsAdmin(userProfile.user_id);
        setIsAdmin(adminStatus);
      }
    };
    
    checkAdminStatus();
  }, [userProfile]);

  return (
    <div className="flex items-center justify-between py-4 mb-6">
      <h1 className="text-2xl font-bold">Customer Portal</h1>
      
      {userProfile && (
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-sm text-muted-foreground">
            Welcome, {userProfile.full_name}
          </span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt={userProfile.full_name} />
                  <AvatarFallback>
                    {userProfile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              
              {isAdmin && (
                <DropdownMenuItem asChild>
                  <Link to="/admin">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                </DropdownMenuItem>
              )}
              
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PortalHeader;
