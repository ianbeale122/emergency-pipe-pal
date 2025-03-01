
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  return (
    <div className="relative w-full md:max-w-md">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search across your portal..."
        className="pl-10"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
