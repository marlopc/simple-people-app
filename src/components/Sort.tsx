import React from "react";
import ArrowDropdown from "../components/icons/ArrowDropdown";
import SortIcon from "../components/icons/Sort";
import { usePeopleContext } from "../contexts/PeopleStorage";
import useMenu from "../hooks/useMenu";
import { SortTypes } from "../hooks/usePeopleStorage";
import "../styles/Sort.css";
import { Dropdown, DropdownItem } from "./Dropdown";
import ArrowRight from "./icons/ArrowRight";

const Sort = () => {
  const sortRef = React.useRef<HTMLButtonElement>(null);
  const { isOpen, toggleMenu, closeMenu } = useMenu();
  const { sort, currentSort } = usePeopleContext();

  const handleSelectSort = (type: SortTypes["types"]) => {
    sort(type);
  };

  return (
    <div>
      <button
        onClick={toggleMenu}
        className={`Sort-button ${isOpen ? "Sort-button_active" : ""}`}
        ref={sortRef}
      >
        <SortIcon />
        <span>Sort</span>
        <ArrowDropdown />
      </button>
      <Dropdown
        initiatorRef={sortRef}
        isOpen={isOpen}
        closeMenu={closeMenu}
        from="right"
      >
        <DropdownItem>
          <button
            onClick={() => handleSelectSort("alphabetically")}
            className={`Sort-selection ${
              currentSort === "alphabetically" ? "Sort-selection_active" : ""
            }`}
          >
            A <ArrowRight /> Z
          </button>
        </DropdownItem>
        <DropdownItem>
          <button
            onClick={() => handleSelectSort("alphabeticallyReverse")}
            className={`Sort-selection ${
              currentSort === "alphabeticallyReverse"
                ? "Sort-selection_active"
                : ""
            }`}
          >
            Z <ArrowRight /> A
          </button>
        </DropdownItem>
        <DropdownItem>
          <button
            onClick={() => handleSelectSort("newestFirst")}
            className={`Sort-selection ${
              currentSort === "newestFirst" ? "Sort-selection_active" : ""
            }`}
          >
            Newest <ArrowRight /> Oldest
          </button>
        </DropdownItem>
        <DropdownItem>
          <button
            onClick={() => handleSelectSort("oldestFirst")}
            className={`Sort-selection ${
              currentSort === "oldestFirst" ? "Sort-selection_active" : ""
            }`}
          >
            Oldest <ArrowRight /> Newest
          </button>
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

export default Sort;
