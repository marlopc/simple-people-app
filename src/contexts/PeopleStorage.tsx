import React from "react";
import usePeopleStorage, { StorageControls } from "../hooks/usePeopleStorage";

interface PeopleStorageProps {
  children: React.ReactNode;
}

const defaultValue: StorageControls = {
  append: () => {},
  currentSort: 'alphabetically',
  edit: () => {},
  filtered: [],
  get: () => undefined,
  isSearch: false,
  remove: () => {},
  search: () => {},
  set: () => {},
  sort: () => {},
  storage: [],
};

export const PeopleContext = React.createContext<StorageControls>(defaultValue);

export const usePeopleContext = () => {
  const context = React.useContext(PeopleContext);

  return context;
}

const PeopleStorageProvider: React.FC<PeopleStorageProps> = ({ children }): React.ReactElement => {
  const peopleStorageControls = usePeopleStorage('people');

  return (
    <PeopleContext.Provider value={peopleStorageControls}>
      {children}
    </PeopleContext.Provider>
  )
};

export default PeopleStorageProvider;
