
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { SignedIn, UserButton } from "@clerk/clerk-react";

// Import our components
import { DesktopNav } from "./navigation/DesktopNav";
import { MobileMenu } from "./navigation/MobileMenu";
import { BottomNav } from "./navigation/BottomNav";
import { isClerkAvailable } from "./navigation/ClerkUtil";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const clerkAvailable = isClerkAvailable();

  const links = [
    { href: "/", label: "Home" },
    { href: "/faq", label: "FAQ" },
    { href: "/chat", label: "Live Chat" },
    { href: "/annual-service", label: "Annual Service" },
    { href: "/emergency", label: "Emergency" },
  ];

  // Protected link that only shows when signed in or when Clerk is not available
  const protectedLinks = [
    { href: "/customer-portal", label: "Customer Portal" },
  ];

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="container px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/6c4f1fb6-e6ec-4ae1-9b8e-c18cce73a22d.png" 
                alt="GPS Plumbing Logo" 
                className="h-10 w-auto"
              />
            </Link>
            
            {/* Desktop Navigation */}
            <DesktopNav 
              links={links} 
              protectedLinks={protectedLinks}
              clerkAvailable={clerkAvailable}
            />

            {/* Mobile Menu Button - only show on medium and below screens when bottom nav isn't visible */}
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
                className="sm:hidden" // Only show on very small screens
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
            clerkAvailable={clerkAvailable}
            onLinkClick={() => setIsMenuOpen(false)}
          />
        </div>
      </nav>
      
      {/* Bottom Navigation for Mobile */}
      <BottomNav />
      
      {/* Add padding to the bottom of the page to account for the bottom nav */}
      <div className="pb-16 md:pb-0"></div>
    </>
  );
};
