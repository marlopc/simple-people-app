import '../styles/List.css';
import React from 'react';
import { Person } from '../App';

export interface Props {
  people: Person[],
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>
};

const List: React.FC<Props> = ({ people, setPeople }) => {
  
  const handleRemove = (id: number): void => {
    const filteredPeople = people.filter((person) => person.id !== id);
    setPeople(filteredPeople);
  };

  return (
    <ul className='List'>
      {people.map((person) => (
        <li className='List-item' key={person.id}>
          <img
            src={person.imageURL} 
            className='List-item-image' 
            alt={person.name} 
          />
          <div className='List-item-info'>
            <h2 className='List-item-info-name'>{person.name}</h2>
            <p className='List-item-info-age'>Age: {person.age}</p>
            <p className='List-item-info-message'>{person.note}</p>
          </div>
          <button 
            className='List-item-remove'
            onClick={() => handleRemove(person.id)}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  )
}

export default List
