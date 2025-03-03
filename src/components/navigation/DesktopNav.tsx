
import { NavLink } from "./NavLink";
import { AuthButtons } from "./AuthButtons";
import { SignedIn } from "@clerk/clerk-react";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DesktopNavProps {
  links: Array<{ href: string; label: string }>;
  protectedLinks: Array<{ href: string; label: string }>;
  adminLink: { href: string; label: React.ReactNode } | null;
  clerkAvailable: boolean;
  isAdminRoute?: boolean;
  loginButton: {
    href: string;
    icon: LucideIcon;
    tooltip: string;
  } | null;
}

export const DesktopNav = ({ 
  links, 
  protectedLinks, 
  adminLink, 
  clerkAvailable, 
  isAdminRoute,
  loginButton
}: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      {links.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          label={link.label}
        />
      ))}
      
      {clerkAvailable ? (
        <SignedIn>
          {protectedLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
            />
          ))}
        </SignedIn>
      ) : (
        // Show protected links when Clerk is not available
        <>
          {protectedLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
            />
          ))}
        </>
      )}
      
      {/* Login button */}
      {loginButton && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link 
                to={loginButton.href}
                className="text-primary hover:text-primary/80 p-2 flex items-center justify-center"
              >
                <loginButton.icon className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{loginButton.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      <div className="pl-4 border-l border-gray-200">
        <AuthButtons clerkAvailable={clerkAvailable} />
      </div>
    </div>
  );
};
