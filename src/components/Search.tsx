import React from "react";
import '../styles/Search.css';
import useTextField from "../hooks/useTextField";
import SearchIcon from '../components/icons/Search';
import Close from "./icons/Close";
import { usePeopleContext } from "../contexts/PeopleStorage";

const Search: React.FC = (): React.ReactElement => {
  const { set, current, clear } = useTextField();
  const { search } = usePeopleContext();

  const isSearch = current !== '';

  React.useEffect(() => {
    search(current);
  }, [current, search]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  return (
    <form className='Search' onSubmit={(e) => e.preventDefault()}>
      <span className='Search-icon'>
        <SearchIcon />
      </span>
      <input
        className='Search-input'
        type='text'
        value={current}
        onChange={set}
        placeholder='Search by name'
        onKeyPress={handleKeyPress}
      />
      <button
        type='button' 
        className={`Search-clear ${isSearch ? 'Search-clear_show' : ''}`}
        onClick={clear}
      >
        <Close />
      </button>
    </form>
  );
};

export default Search;
