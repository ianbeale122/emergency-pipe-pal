
import { Button } from "@/components/ui/button";
import { NavLink } from "./NavLink";
import { AuthButtons } from "./AuthButtons";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";

interface MobileMenuProps {
  isOpen: boolean;
  links: Array<{ href: string; label: string }>;
  protectedLinks: Array<{ href: string; label: string }>;
  clerkAvailable: boolean;
  onLinkClick: () => void;
}

export const MobileMenu = ({
  isOpen,
  links,
  protectedLinks,
  clerkAvailable,
  onLinkClick,
}: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden py-2">
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
