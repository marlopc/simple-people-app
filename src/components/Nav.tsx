import React from "react";
import { DrawerControls } from "../hooks/useDrawer";
import "../styles/Nav.css";
import Menu from "./icons/Menu";
import People from "./icons/People";

type NavProps = {
  openDrawer: DrawerControls["open"];
  openButtonRef: React.RefObject<HTMLButtonElement>;
};

const Nav: React.FC<NavProps> = ({
  openDrawer,
  openButtonRef,
}): React.ReactElement => {
  return (
    <>
      <div className="Nav-push" />
      <nav className="Nav">
        <button
          className="Nav-menu-button rounded"
          onClick={() => openDrawer()}
          aria-label="Open nav"
          ref={openButtonRef}
        >
          <Menu />
        </button>
        <div className="Nav-title">
          <h2>People</h2>
          <People />
        </div>
      </nav>
    </>
  );
};

export default Nav;
