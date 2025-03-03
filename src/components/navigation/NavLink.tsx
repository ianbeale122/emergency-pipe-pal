
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

export const NavLink = ({ href, label, onClick, className }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors relative",
        isActive
          ? "bg-primary/10 text-primary font-semibold" // Changed from bg-primary text-primary-foreground
          : "text-gray-600 hover:bg-gray-100 hover:text-primary",
        // Add an indicator line at the bottom for active state
        isActive && "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-t-md",
        className
      )}
    >
      {label}
    </Link>
  );
};
