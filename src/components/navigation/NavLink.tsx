
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
  
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
        location.pathname === href
          ? "bg-primary text-primary-foreground"
          : "text-gray-600 hover:bg-gray-100",
        className
      )}
    >
      {label}
    </Link>
  );
};
