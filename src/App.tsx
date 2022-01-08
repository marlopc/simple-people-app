import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import List from './components/List';

export interface Person {
  id: number,
  name: string,
  age: number,
  imageURL: string,
  note?: string,
}

function App() {
  const [people, setPeople] = useState<Person[]>([]);

  return (
    <div className='App'>
      <h1 className='App-title'>People</h1>
      <List people={people} setPeople={setPeople}/>
      <Form people={people} setPeople={setPeople}/>
    </div>
  );
}

export default App;
