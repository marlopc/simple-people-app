import React from "react";
import { NavLink } from "react-router-dom";
import useClickOutside from "../hooks/useClickOutside";
import { Theme } from "../hooks/useDarkMode";
import { DrawerControls } from "../hooks/useDrawer";
import "../styles/Drawer.css";
import Close from "./icons/Close";
import People from "./icons/People";
import Switch from "./Switch";

type DrawerProps = {
  theme: Theme;
  closeDrawer: DrawerControls["close"];
  isOpen: DrawerControls["isOpen"];
  closeButtonRef: React.RefObject<HTMLButtonElement>;
};

const Drawer: React.FC<DrawerProps> = ({
  theme,
  isOpen,
  closeDrawer,
  closeButtonRef,
}): React.ReactElement => {
  const drawerRef = React.useRef<HTMLElement>(null);

  useClickOutside(drawerRef, () => isOpen && closeDrawer(false));

  return (
    <>
      <div className={`Drawer-bg ${isOpen ? "Drawer-bg_show" : ""}`} />
      <nav
        className={`Drawer ${isOpen ? "Drawer_open" : ""}`}
        aria-hidden={!isOpen}
        style={{ visibility: isOpen ? "visible" : "hidden" }}
        ref={drawerRef}
      >
        <header className="Drawer-header">
          <span className="Drawer-header-title">
            <h3>People</h3>
            <People />
          </span>
          <button
            onClick={() => closeDrawer()}
            className="rounded"
            ref={closeButtonRef}
          >
            <Close />
          </button>
        </header>
        <ul className="LinkList">
          <li className="LinkList-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `Link ${isActive ? "Link_active" : ""}`
              }
            >
              People
            </NavLink>
          </li>
          <li className="LinkList-item">
            <NavLink
              to="/add"
              className={({ isActive }) =>
                `Link ${isActive ? "Link_active" : ""}`
              }
            >
              Add contact
            </NavLink>
          </li>
          <li className="LinkList-item">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `Link ${isActive ? "Link_active" : ""}`
              }
            >
              About
            </NavLink>
          </li>
        </ul>
        <footer className="Drawer-footer">
          <div className="Drawer-footer-darkmode">
            Dark mode
            <Switch
              checked={theme.current === "dark"}
              setChecked={theme.toggleTheme}
            />
          </div>
          <ul className="Drawer-footer-links">
            <li>
              <a
                href="https://www.github.com/marlopc"
                rel="noopener noreferrer"
                target="_blank"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/lucas-panaro/"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://lucaspanaro.ga/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Website
              </a>
            </li>
          </ul>
        </footer>
      </nav>
    </>
  );
};

export default Drawer;
