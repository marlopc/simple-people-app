import React from "react";
import { useLocation } from "react-router-dom";
import useMenu, { MenuControls } from "./useMenu";

type DrawerInterElement = React.RefObject<HTMLButtonElement | HTMLElement>;

export interface DrawerControls {
  open: () => void;
  close: (focus?: boolean) => void;
  toggle: () => void;
  isOpen: MenuControls["isOpen"];
}

const useDrawer = (
  opener: DrawerInterElement,
  closer: DrawerInterElement
): DrawerControls => {
  const { openMenu, closeMenu, toggleMenu, isOpen } = useMenu();
  const { pathname } = useLocation();

  const close = React.useCallback(
    (focus: boolean = true) => {
      closeMenu();
      if (focus) opener.current?.focus();
    },
    [opener, closeMenu]
  );

  const toggle = React.useCallback(() => {
    toggleMenu();
    if (!isOpen) opener.current?.focus();
  }, [opener, toggleMenu, isOpen]);

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        close();
        e.preventDefault();
      }
    },
    [close]
  );

  React.useEffect(() => {
    close(false);
  }, [pathname, close]);

  React.useEffect(() => {
    if (isOpen) closer.current?.focus();
  }, [isOpen, closer]);

  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return {
    open: openMenu,
    close,
    isOpen,
    toggle,
  };
};

export default useDrawer;
