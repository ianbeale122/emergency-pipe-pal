import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Badge } from "@/components/ui/badge";

// Import our components
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { BottomNav } from "@/components/navigation/BottomNav";
import { isClerkAvailable } from "@/components/navigation/ClerkUtil";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const clerkAvailable = isClerkAvailable();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isPortalRoute = location.pathname.startsWith('/customer-portal');
  const isAtPortal = location.pathname === "/customer-portal";

  const links = [
    { href: "/", label: "Home" },
    { href: "/faq", label: "FAQ" },
    { href: "/chat", label: "Help" },
    { href: "/annual-service", label: "Annual Service" },
    { href: "/emergency", label: "Emergency" },
  ];

  useEffect(() => {
    // Add a class to the body when in admin routes
    if (isAdminRoute) {
      document.body.classList.add('admin-mode');
    } else {
      document.body.classList.remove('admin-mode');
    }
    
    return () => {
      document.body.classList.remove('admin-mode');
    };
  }, [isAdminRoute]);

  return (
    <>
      <nav className={`bg-white shadow-sm ${isAdminRoute ? 'border-b-2 border-indigo-500' : ''}`}>
        <div className="container px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/6c4f1fb6-e6ec-4ae1-9b8e-c18cce73a22d.png" 
                alt="GPS Plumbing Logo" 
                className="h-10 w-auto"
              />
              {isAdminRoute && (
                <Badge className="ml-2 bg-indigo-600 text-white">
                  Admin Portal
                </Badge>
              )}
              {isPortalRoute && (
                <Badge className="ml-2 bg-blue-600 text-white">
                  Customer Portal
                </Badge>
              )}
            </Link>
            
            {/* Mobile top nav */}
            <div className="flex items-center md:hidden">
              {/* Login icon button for mobile */}
              {!isAtPortal && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/customer-portal" className="mr-3">
                        <LogIn className="h-5 w-5 text-primary" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Login</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              {clerkAvailable && (
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="sm:hidden ml-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
            
            {/* Desktop Navigation */}
            <DesktopNav 
              links={links} 
              protectedLinks={[]}
              adminLink={null}
              clerkAvailable={clerkAvailable}
              isAdminRoute={isAdminRoute}
              loginButton={!isAtPortal ? {
                href: "/customer-portal",
                icon: LogIn,
                tooltip: "Login"
              } : null}
            />
          </div>

          {/* Mobile Navigation */}
          <MobileMenu
            isOpen={isMenuOpen}
            links={links}
            protectedLinks={[]}
            adminLink={null}
            clerkAvailable={clerkAvailable}
            isAdminRoute={isAdminRoute}
            onLinkClick={() => setIsMenuOpen(false)}
          />
        </div>
      </nav>
      
      {/* Bottom Navigation for Mobile - without admin button */}
      <BottomNav isAdminRoute={isAdminRoute} />
      
      {/* Add padding to the bottom of the page to account for the bottom nav */}
      <div className="pb-16 md:pb-0"></div>
      
      {/* Admin button for desktop view */}
      <div className="fixed bottom-4 right-4 hidden md:block">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link 
                to="/admin" 
                className="text-gray-400 hover:text-gray-600 bg-white p-2 rounded-full shadow-sm border border-gray-200 flex items-center justify-center"
              >
                <Shield className="h-4 w-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Admin Access</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};
