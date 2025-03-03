
import { Button } from "@/components/ui/button";
import { NavLink } from "./NavLink";
import { AuthButtons } from "./AuthButtons";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  links: Array<{ href: string; label: string }>;
  protectedLinks: Array<{ href: string; label: string }>;
  adminLink: { href: string; label: React.ReactNode } | null;
  clerkAvailable: boolean;
  isAdminRoute?: boolean;
  onLinkClick: () => void;
}

export const MobileMenu = ({
  isOpen,
  links,
  protectedLinks,
  adminLink,
  clerkAvailable,
  isAdminRoute,
  onLinkClick,
}: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden py-2">
      {/* Portal links at the top of mobile menu */}
      <div className="flex flex-col gap-2 px-3 mb-3">
        <Link
          to="/customer-portal"
          className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100"
          onClick={onLinkClick}
        >
          <Users className="h-4 w-4" />
          Customer Portal
        </Link>
        
        <Link
          to="/admin"
          className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
          onClick={onLinkClick}
        >
          <Shield className="h-4 w-4" />
          Admin Portal
        </Link>
      </div>
      
      {/* Regular navigation links */}
      {links.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          label={link.label}
          onClick={onLinkClick}
          className="block"
        />
      ))}
      
      {clerkAvailable ? (
        <SignedIn>
          {protectedLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              onClick={onLinkClick}
              className="block"
            />
          ))}
          
          {/* Admin link removed from here */}
        </SignedIn>
      ) : (
        // Show protected links when Clerk is not available
        <>
          {protectedLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              onClick={onLinkClick}
              className="block"
            />
          ))}
          
          {/* Admin link removed from here */}
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
  );
};
