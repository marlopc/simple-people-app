import React from 'react';
import '../styles/Dropdown.css';

interface DropdownItemProps {
  children: React.ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ children }): React.ReactElement => {
  return (
    <li className='Dropdown-item'>
      {children}
    </li>
  )
};

interface DropdownProps {
  children: React.ReactNode;
  initiatorRef: React.RefObject<HTMLElement>;
  isOpen: boolean;
  closeMenu: () => void;
  from?: 'left' | 'right';
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  initiatorRef,
  isOpen,
  closeMenu,
  from = 'left'
}): React.ReactElement => {
  const menuRef = React.useRef<HTMLUListElement>(null);
  
  const setPosition = React.useCallback((initiator: HTMLElement | null, menu: HTMLElement | null) => {
    if(!initiator || !menu) return;

    const left = initiator.offsetLeft;
    const width = initiator.offsetWidth;
    const top = initiator.offsetTop;
    const height = initiator.offsetHeight;

    let right = window.innerWidth - (left + width);
    if(right < 0) right = 0;
    
    menu.style.top = `${top + height}px`;
    
    from === 'left'
      ? menu.style.left = `${left}px`
      : menu.style.right = `${right}px`;
  }, [from]);

  React.useEffect(() => {
    if(!initiatorRef.current || !menuRef.current) return;

    setPosition(initiatorRef.current, menuRef.current);
  }, [initiatorRef, menuRef, from, setPosition]);

  React.useEffect(() => {
    const cb = () => setPosition(initiatorRef.current, menuRef.current);

    window.addEventListener('resize', cb);

    return () => window.removeEventListener('resize', cb);
  }, [setPosition, initiatorRef, menuRef])

  React.useEffect(() => {
    const cb = () => closeMenu();

    isOpen
      ? document.documentElement.addEventListener('click', cb)
      : document.documentElement.removeEventListener('click', cb);

    return () => document.removeEventListener('click', cb);
  }, [isOpen, closeMenu])

  return (
    <>
      <div className={`Dropdown-bg ${isOpen ? 'Dropdown-bg_show' : ''}`} />
      <ul
        ref={menuRef}
        className={`Dropdown-list ${isOpen ? 'Dropdown-list_open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </ul>
    </>
  );
};

export { Dropdown, DropdownItem };
