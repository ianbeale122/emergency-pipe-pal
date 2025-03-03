
import { NavLink } from "./NavLink";
import { AuthButtons } from "./AuthButtons";
import { SignedIn } from "@clerk/clerk-react";

interface DesktopNavProps {
  links: Array<{ href: string; label: string }>;
  protectedLinks: Array<{ href: string; label: string }>;
  adminLink: { href: string; label: React.ReactNode } | null;
  clerkAvailable: boolean;
  isAdminRoute?: boolean;
}

export const DesktopNav = ({ links, protectedLinks, adminLink, clerkAvailable, isAdminRoute }: DesktopNavProps) => {
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
          
          {adminLink && (
            <NavLink
              key={adminLink.href}
              href={adminLink.href}
              label={adminLink.label}
              className="bg-indigo-100 hover:bg-indigo-200"
            />
          )}
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
          
          {adminLink && (
            <NavLink
              key={adminLink.href}
              href={adminLink.href}
              label={adminLink.label}
              className="bg-indigo-100 hover:bg-indigo-200"
            />
          )}
        </>
      )}
      
      <div className="pl-4 border-l border-gray-200">
        <AuthButtons clerkAvailable={clerkAvailable} />
      </div>
    </div>
  );
};
