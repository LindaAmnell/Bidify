import "./SearchBar.css";
import { FaMagnifyingGlass } from "react-icons/fa6";

// type SearchBarProps = {
//   value: string;
//   onChange: (value: string) => void;
// };

const SearchBar = () => {
  return (
    <div className="searchbar">
      <FaMagnifyingGlass className="icon" />
      <input
        type="text"
        placeholder="Search auctions..."
        // value={value}
        // onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
export default SearchBar;
