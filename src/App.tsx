import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Drawer from "./components/Drawer";
import Nav from "./components/Nav";
import PeopleStorage from "./contexts/PeopleStorage";
import useDarkMode, { Theme } from "./hooks/useDarkMode";
import useDrawer from "./hooks/useDrawer";
import About from "./pages/About";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PersonProfile from "./pages/Person";

export interface Person {
  id: number;
  name: string;
  age: number;
  imageURL?: string;
  phone?: string;
  note?: string;
  timestamp: number;
}

const Navigation: React.FC<{ theme: Theme }> = ({
  theme,
}): React.ReactElement => {
  const openButtonRef = React.useRef<HTMLButtonElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  const drawer = useDrawer(openButtonRef, closeButtonRef);

  return (
    <>
      <Nav openDrawer={drawer.open} openButtonRef={openButtonRef} />
      <Drawer
        isOpen={drawer.isOpen}
        closeDrawer={drawer.close}
        theme={theme}
        closeButtonRef={closeButtonRef}
      />
    </>
  );
};

const App = (): React.ReactElement => {
  const theme = useDarkMode();

  return (
    <div className="App" data-theme={theme.current}>
      <Navigation theme={theme} />
      <PeopleStorage>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/person/:id" element={<PersonProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PeopleStorage>
    </div>
  );
};

export default App;
