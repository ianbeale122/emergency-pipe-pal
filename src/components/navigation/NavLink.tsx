
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
  icon?: LucideIcon;
  isBottomNav?: boolean;
}

export const NavLink = ({ href, label, onClick, className, icon: Icon, isBottomNav }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  
  if (isBottomNav) {
    return (
      <Link
        to={href}
        onClick={onClick}
        className={cn(
          "flex flex-col items-center justify-center py-2 text-xs transition-colors relative",
          isActive
            ? "text-primary font-semibold"
            : "text-gray-600 hover:text-primary",
          className
        )}
      >
        {Icon && <Icon className={cn("h-5 w-5 mb-1", isActive ? "text-primary" : "text-gray-600")} />}
        <span>{label}</span>
        {isActive && (
          <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-primary rounded-t-md" />
        )}
      </Link>
    );
  }
  
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors relative",
        isActive
          ? "bg-primary/10 text-primary font-semibold"
          : "text-gray-600 hover:bg-gray-100 hover:text-primary",
        isActive && "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-t-md",
        className
      )}
    >
      {label}
    </Link>
  );
};
