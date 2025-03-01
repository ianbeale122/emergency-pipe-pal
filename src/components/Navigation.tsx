
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/clerk-react";

// Check if Clerk is available using a safer approach
const isClerkAvailable = () => {
  try {
    return typeof window !== 'undefined' && 'Clerk' in window;
  } catch (e) {
    return false;
  }
};

export const Navigation = () => {
  const location = useLocation();
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
          <div className="hidden md:flex items-center space-x-4">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {link.label}
              </Link>
            ))}
            
            {clerkAvailable ? (
              <SignedIn>
                {protectedLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      location.pathname === link.href
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </SignedIn>
            ) : (
              // Show protected links when Clerk is not available
              <>
                {protectedLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      location.pathname === link.href
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </>
            )}
            
            <div className="pl-4 border-l border-gray-200">
              {clerkAvailable ? (
                <>
                  <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                  <SignedOut>
                    <div className="flex items-center gap-2">
                      <SignInButton mode="modal">
                        <Button variant="outline" size="sm">Sign In</Button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <Button size="sm">Sign Up</Button>
                      </SignUpButton>
                    </div>
                  </SignedOut>
                </>
              ) : (
                // Show a message or dummy button when Clerk is not available
                <div className="text-xs text-gray-500">
                  Auth disabled
                </div>
              )}
            </div>
          </div>

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
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-2">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {link.label}
              </Link>
            ))}
            
            {clerkAvailable ? (
              <SignedIn>
                {protectedLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      location.pathname === link.href
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </SignedIn>
            ) : (
              // Show protected links when Clerk is not available
              <>
                {protectedLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      location.pathname === link.href
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </>
            )}
            
            {clerkAvailable && (
              <SignedOut>
                <div className="mt-3 space-y-2 px-3">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="w-full">Sign Up</Button>
                  </SignUpButton>
                </div>
              </SignedOut>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
