import React from "react";
import SearchIcon from "../components/icons/Search";
import { usePeopleContext } from "../contexts/PeopleStorage";
import useTextField from "../hooks/useTextField";
import "../styles/Search.css";
import Close from "./icons/Close";

const Search: React.FC = (): React.ReactElement => {
  const inputFieldRef = React.useRef<HTMLInputElement>(null);
  const { set, current, clear } = useTextField();
  const { search } = usePeopleContext();

  const isSearch = current !== "";

  React.useEffect(() => {
    search(current);
  }, [current, search]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const handleClear = () => {
    clear();
    inputFieldRef.current?.focus();
  };

  return (
    <form className="Search" onSubmit={(e) => e.preventDefault()}>
      <span className="Search-icon">
        <SearchIcon />
      </span>
      <input
        className="Search-input"
        type="text"
        value={current}
        onChange={set}
        placeholder="Search by name"
        onKeyPress={handleKeyPress}
        ref={inputFieldRef}
      />
      <button
        type="button"
        className={`Search-clear ${isSearch ? "Search-clear_show" : ""}`}
        onClick={handleClear}
        style={{ visibility: isSearch ? "visible" : "hidden" }}
      >
        <Close />
      </button>
    </form>
  );
};

export default Search;
