import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import PeopleStorage from './contexts/PeopleStorage';
import Drawer from './components/Drawer';
import useDarkMode from './hooks/useDarkMode';
import useMenu from './hooks/useMenu';
import Home from './pages/Home';
import Add from './pages/Add';
import Edit from './pages/Edit';
import PersonProfile from './pages/Person';
import About from './pages/About';
import NotFound from './pages/NotFound';

export interface Person {
  id: number,
  name: string,
  age: number,
  imageURL?: string,
  phone?: string,
  note?: string,
  timestamp: number,
}

const App = (): React.ReactElement => {
  const theme = useDarkMode();
  const drawer = useMenu();

  return (
    <div className='App' data-theme={theme.current}>
      <PeopleStorage>
        <Nav drawer={drawer} />
        <Drawer theme={theme} isOpen={drawer.isOpen} close={drawer.closeMenu}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/person/:id' element={<PersonProfile />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </PeopleStorage>
    </div>
  );
}

export default App;
