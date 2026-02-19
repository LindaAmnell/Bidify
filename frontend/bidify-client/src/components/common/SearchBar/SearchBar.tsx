import "./SearchBar.css";
import { FaMagnifyingGlass } from "react-icons/fa6";

type SearchBarProps = {
  onSearch: (value: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="searchbar">
      <FaMagnifyingGlass className="icon" />
      <input
        type="text"
        placeholder="Search auctions..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
