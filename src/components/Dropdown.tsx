import React from "react";
import useClickOutside from "../hooks/useClickOutside";
import "../styles/Dropdown.css";

type DropdownProps = {
  initiatorRef: React.RefObject<HTMLElement>;
  isOpen: boolean;
  closeMenu: () => void;
  from?: "left" | "right";
};

const DropdownItem: React.FC = ({ children }) => {
  return <li className="Dropdown-item">{children}</li>;
};

const Dropdown: React.FC<DropdownProps> = ({
  children,
  initiatorRef,
  isOpen,
  closeMenu,
  from = "left",
}) => {
  const menuRef = React.useRef<HTMLUListElement>(null);

  useClickOutside(menuRef, () => isOpen && closeMenu());

  const setPosition = React.useCallback(() => {
    if (!initiatorRef.current || !menuRef.current) return;

    const { left, width, top, height } =
      initiatorRef.current.getBoundingClientRect();

    let right = document.body.clientWidth - (left + width);
    if (right < 0) right = 0;

    menuRef.current.style.top = `${top + height}px`;

    if (from === "left") {
      menuRef.current.style.left = `${left}px`;
    } else {
      menuRef.current.style.right = `${right}px`;
    }
  }, [from, menuRef, initiatorRef]);

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        closeMenu();
        e.preventDefault();
      }
    },
    [closeMenu]
  );

  React.useEffect(() => {
    setPosition();
  }, [setPosition]);

  React.useEffect(() => {
    const cb = () => setPosition();

    window.addEventListener("resize", cb);

    return () => window.removeEventListener("resize", cb);
  }, [setPosition, initiatorRef, menuRef]);

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

  return (
    <>
      <div className={`Dropdown-bg ${isOpen ? "Dropdown-bg_show" : ""}`} />
      <ul
        ref={menuRef}
        className={`Dropdown-list ${isOpen ? "Dropdown-list_open" : ""}`}
        style={{ visibility: isOpen ? "visible" : "hidden" }}
      >
        {children}
      </ul>
    </>
  );
};

export { Dropdown, DropdownItem };
