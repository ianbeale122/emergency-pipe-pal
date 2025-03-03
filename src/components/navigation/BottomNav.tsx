
import { Home, FileQuestion, HelpCircle, CalendarClock, AlertTriangle, User, Shield } from "lucide-react";
import { useLocation } from "react-router-dom";
import { NavLink } from "./NavLink";
import { isClerkAvailable } from "./ClerkUtil";
import { SignedIn } from "@clerk/clerk-react";

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
      
      {/* Render protected items if user is signed in or Clerk is not available */}
      {clerkAvailable ? (
        <SignedIn>
          <div className="grid grid-cols-2 w-full border-t border-gray-100">
            {protectedItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isBottomNav
              />
            ))}
            <NavLink
              key={adminItem.href}
              href={adminItem.href}
              label={adminItem.label}
              icon={adminItem.icon}
              isBottomNav
              className={isAdminRoute ? "bg-indigo-100" : ""}
            />
          </div>
        </SignedIn>
      ) : (
        <div className="grid grid-cols-2 w-full border-t border-gray-100">
          {protectedItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              isBottomNav
            />
          ))}
          <NavLink
            key={adminItem.href}
            href={adminItem.href}
            label={adminItem.label}
            icon={adminItem.icon}
            isBottomNav
            className={isAdminRoute ? "bg-indigo-100" : ""}
          />
        </div>
      )}
    </div>
  );
};
