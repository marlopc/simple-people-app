import React from "react";

export interface MenuControls {
  isOpen: boolean;
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;
}

const useMenu = (initialState?: boolean): MenuControls => {
  const [isOpen, setIsOpen] = React.useState(initialState || false);

  const toggleMenu = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const openMenu = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeMenu = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    toggleMenu,
    openMenu,
    closeMenu,
  };
};

export default useMenu;
