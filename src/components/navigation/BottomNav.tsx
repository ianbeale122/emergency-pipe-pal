
import { Home, FileQuestion, HelpCircle, CalendarClock, AlertTriangle, User, Shield } from "lucide-react";
import { useLocation } from "react-router-dom";
import { NavLink } from "./NavLink";
import { isClerkAvailable } from "./ClerkUtil";
import { SignedIn } from "@clerk/clerk-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BottomNavProps {
  isAdminRoute?: boolean;
}

export const BottomNav = ({ isAdminRoute }: BottomNavProps) => {
  const clerkAvailable = isClerkAvailable();
  const location = useLocation();

  // Define navigation items with their icons
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/faq", label: "FAQ", icon: FileQuestion },
    { href: "/chat", label: "Help", icon: HelpCircle },
    { href: "/annual-service", label: "Service", icon: CalendarClock },
    { href: "/emergency", label: "Emergency", icon: AlertTriangle },
  ];

  // Protected items
  const protectedItems = [
    { href: "/customer-portal", label: "Portal", icon: User }
  ];
  
  // Admin item
  const adminItem = { href: "/admin", label: "Admin", icon: Shield };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden ${isAdminRoute ? 'border-t-indigo-500 border-t-2' : ''}`}>
      <div className="grid grid-cols-5 w-full">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isBottomNav
          />
        ))}
      </div>
      
      {/* Regular protected items */}
      {clerkAvailable ? (
        <SignedIn>
          <div className="grid grid-cols-1 w-full border-t border-gray-100">
            {protectedItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isBottomNav
              />
            ))}
          </div>
        </SignedIn>
      ) : (
        <div className="grid grid-cols-1 w-full border-t border-gray-100">
          {protectedItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              isBottomNav
            />
          ))}
        </div>
      )}
      
      {/* Discreet admin button at the bottom */}
      {((!clerkAvailable) || (clerkAvailable && location.pathname.includes('customer-portal'))) && (
        <div className="border-t border-gray-100 py-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center">
                  <NavLink
                    key="admin-discreet"
                    href="/admin"
                    label=""
                    className="text-gray-400 hover:text-gray-600 py-1"
                  >
                    <Shield className="h-4 w-4" />
                  </NavLink>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Admin Access</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};
