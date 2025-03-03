
import { Home, FileQuestion, HelpCircle, CalendarClock, AlertTriangle, LogIn } from "lucide-react";
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
  const isAtPortal = location.pathname === "/customer-portal";

  // Define navigation items with their icons
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/faq", label: "FAQ", icon: FileQuestion },
    { href: "/chat", label: "Help", icon: HelpCircle },
    { href: "/annual-service", label: "Service", icon: CalendarClock },
    { href: "/emergency", label: "Emergency", icon: AlertTriangle },
  ];

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
      
      {/* Login button (only if not on portal page) */}
      {!isAtPortal && (
        <div className="grid grid-cols-1 w-full border-t border-gray-100">
          <NavLink
            href="/customer-portal"
            label="Login"
            icon={LogIn}
            isBottomNav
          />
        </div>
      )}
    </div>
  );
};
