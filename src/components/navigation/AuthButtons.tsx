
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/clerk-react";

interface AuthButtonsProps {
  clerkAvailable: boolean;
  className?: string;
}

export const AuthButtons = ({ clerkAvailable, className }: AuthButtonsProps) => {
  if (!clerkAvailable) {
    return (
      <div className={cn("text-xs text-gray-500", className)}>
        Auth disabled
      </div>
    );
  }

  return (
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
  );
};

// Import the necessary dependencies at the top
import { cn } from "@/lib/utils";
