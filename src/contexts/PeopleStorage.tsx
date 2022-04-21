import React from "react";
import usePeopleStorage, { StorageControls } from "../hooks/usePeopleStorage";

interface PeopleStorageProps {
  children: React.ReactNode;
}

export const PeopleContext = React.createContext<StorageControls>(
  {} as StorageControls
);

export const usePeopleContext = () => {
  const context = React.useContext(PeopleContext);

  return context;
};

const PeopleStorageProvider: React.FC<PeopleStorageProps> = ({
  children,
}): React.ReactElement => {
  const peopleStorageControls = usePeopleStorage("people");

  return (
    <PeopleContext.Provider value={peopleStorageControls}>
      {children}
    </PeopleContext.Provider>
  );
};

export default PeopleStorageProvider;
