
import { NavLink } from "./NavLink";
import { AuthButtons } from "./AuthButtons";
import { SignedIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Shield, Users } from "lucide-react";

interface DesktopNavProps {
  links: Array<{ href: string; label: string }>;
  protectedLinks: Array<{ href: string; label: string }>;
  adminLink: { href: string; label: React.ReactNode } | null;
  clerkAvailable: boolean;
  isAdminRoute?: boolean;
  loginButton?: {
    href: string;
    icon: any;
    tooltip: string;
  } | null;
}

export const DesktopNav = ({ 
  links,
  protectedLinks,
  adminLink,
  clerkAvailable, 
  isAdminRoute
}: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      {/* Regular navigation links */}
      <div className="flex items-center space-x-1">
        {links.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
          />
        ))}
      </div>
      
      <div className="border-l border-gray-200 h-6 mx-2"></div>
      
      {/* Customer Portal Button */}
      <Link
        to="/customer-portal"
        className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100"
      >
        <Users className="h-4 w-4" />
        Customer Portal
      </Link>
      
      {/* Admin Portal Button */}
      <Link
        to="/admin"
        className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
      >
        <Shield className="h-4 w-4" />
        Admin
      </Link>
      
      <div className="pl-4 border-l border-gray-200">
        <AuthButtons clerkAvailable={clerkAvailable} />
      </div>
    </div>
  );
};
