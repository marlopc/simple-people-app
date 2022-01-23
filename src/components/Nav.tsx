import React from "react";
import { MenuControls } from "../hooks/useMenu";
import '../styles/Nav.css';
import Menu from "./icons/Menu";
import People from "./icons/People";

const Nav: React.FC<{drawer: MenuControls}> = ({ drawer }): React.ReactElement => {
  const handleOpenDrawer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    drawer.openMenu();
  };
  
  return (
    <>
      <div className='Nav-push' />
      <nav className='Nav'>
        <button className='Nav-menu-button rounded' onClick={handleOpenDrawer} aria-label='Open nav'>
          <Menu />
        </button>
        <div className='Nav-title'>
          <h2>People</h2><People />
        </div>
      </nav>
    </>
  );
};

export default Nav;
