import React from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { Theme } from "../hooks/useDarkMode";
import { MenuControls } from "../hooks/useMenu";
import '../styles/Drawer.css';
import Close from "./icons/Close";
import People from "./icons/People";
import Switch from "./Switch";

interface DrawerProps {
  theme: Theme;
  isOpen: MenuControls['isOpen'];
  close: MenuControls['closeMenu'];
}

const Drawer: React.FC<DrawerProps> = ({ theme, isOpen, close }): React.ReactElement => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    const cb = () => close();

    document.documentElement.addEventListener('click', cb);

    return () => document.documentElement.addEventListener('click', cb);
  }, [close]);

  React.useEffect(() => {
    close();
  }, [pathname, close])

  return (
    <>
      <div className={`Drawer-bg ${isOpen ? 'Drawer-bg_show' : ''}`}/>
      <nav
        className={`Drawer ${isOpen ? 'Drawer_open' : ''}`}
        onClick={(e) => e.stopPropagation()}
        aria-hidden={!isOpen}
      >
        <header className='Drawer-header'>
          <span className='Drawer-header-title'>
            <h3>People</h3><People />
          </span>
          <button onClick={close} className='rounded'>
            <Close />
          </button>
        </header>
        <ul className='LinkList'>
          <li className='LinkList-item'>
            <NavLink
              to='/'
              className={({ isActive }) => `Link ${isActive ? 'Link_active' : ''}`}
            >
              People
            </NavLink>
          </li>
          <li className='LinkList-item'>
            <NavLink
              to='/add'
              className={({ isActive }) => `Link ${isActive ? 'Link_active' : ''}`}
            >
              Add contact
            </NavLink>
          </li>
          <li className='LinkList-item'>
            <NavLink
              to='/about'
              className={({ isActive }) => `Link ${isActive ? 'Link_active' : ''}`}
            >
              About
            </NavLink>
          </li>
        </ul>
        <footer className='Drawer-footer'>
          <div className='Drawer-footer-darkmode'>
            Dark mode
            <Switch
              checked={theme.current === 'dark'}
              setChecked={theme.toggleTheme}
            />
          </div>
          <ul className='Drawer-footer-links'>
            <li>
              <a
                href='https://www.github.com/marlopc'
                rel='noopener noreferrer'
                target='_blank'
              >
                Github
              </a>
            </li>
            <li>
              <a
                href='https://www.linkedin.com/in/lucas-panaro/'
                rel='noopener noreferrer'
                target='_blank'
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href='https://lucaspanaro.ga/'
                rel='noopener noreferrer'
                target='_blank'
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
