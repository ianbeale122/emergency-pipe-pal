
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // For mobile, we'll toggle the search bar visibility
  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded && searchTerm) {
      onSearchChange(""); // Clear search when collapsing
    }
  };

  return (
    <div className="relative w-full">
      <div className={`flex items-center gap-2 ${isExpanded ? 'w-full' : ''}`}>
        {/* Mobile search toggle */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleSearch}
          className="md:hidden"
        >
          {isExpanded ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
        </Button>
        
        {/* Search input - conditionally shown on mobile */}
        <div className={`relative flex-1 transition-all duration-200 ${isExpanded ? 'block w-full' : 'hidden md:block'}`}>
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
