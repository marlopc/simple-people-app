import React from 'react';

export interface MenuControls {
  isOpen: boolean;
  toggleMenu: (e?: React.MouseEvent<HTMLElement>) => void;
  openMenu: (e?: React.MouseEvent<HTMLElement>) => void;
  closeMenu: () => void;
};

const useMenu = (initialState?: boolean): MenuControls => {
  const [isOpen, setIsOpen] = React.useState(initialState || false);
  
  const toggleMenu = React.useCallback((e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation();

    setIsOpen(prev => !prev);
  }, []);
  
  const openMenu = React.useCallback((e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation();

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
