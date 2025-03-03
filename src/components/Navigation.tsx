
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Badge } from "./ui/badge";

// Import our components
import { DesktopNav } from "./navigation/DesktopNav";
import { MobileMenu } from "./navigation/MobileMenu";
import { BottomNav } from "./navigation/BottomNav";
import { isClerkAvailable } from "./navigation/ClerkUtil";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const clerkAvailable = isClerkAvailable();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const links = [
    { href: "/", label: "Home" },
    { href: "/faq", label: "FAQ" },
    { href: "/chat", label: "Help" },
    { href: "/annual-service", label: "Annual Service" },
    { href: "/emergency", label: "Emergency" },
  ];

  // Protected link that only shows when signed in or when Clerk is not available
  const protectedLinks = [
    { href: "/customer-portal", label: "Customer Portal" },
  ];
  
  // Admin link
  const adminLink = { 
    href: "/admin", 
    label: (
      <span className="flex items-center gap-1">
        <Shield className="h-3.5 w-3.5 text-indigo-500" />
        Admin
      </span>
    ) 
  };

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
            </Link>
            
            {/* Desktop Navigation */}
            <DesktopNav 
              links={links} 
              protectedLinks={protectedLinks}
              adminLink={isAdminRoute ? null : adminLink}
              clerkAvailable={clerkAvailable}
              isAdminRoute={isAdminRoute}
            />

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              {clerkAvailable && (
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="sm:hidden"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <MobileMenu
            isOpen={isMenuOpen}
            links={links}
            protectedLinks={protectedLinks}
            adminLink={isAdminRoute ? null : adminLink}
            clerkAvailable={clerkAvailable}
            isAdminRoute={isAdminRoute}
            onLinkClick={() => setIsMenuOpen(false)}
          />
        </div>
      </nav>
      
      {/* Bottom Navigation for Mobile */}
      <BottomNav isAdminRoute={isAdminRoute} />
      
      {/* Add padding to the bottom of the page to account for the bottom nav */}
      <div className="pb-16 md:pb-0"></div>
    </>
  );
};
