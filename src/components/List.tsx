import '../styles/List.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../App';
import { usePeopleContext } from '../contexts/PeopleStorage';
import Sort from "./Sort";
import PersonAdd from './icons/PersonAdd';
import defaultUserImage from '../assets/default-user.jpg';

const Header: React.FC<{isSearch: boolean, matches: number}> = ({ isSearch, matches }) => {
  return (
    <header className='List-header'>
      <h4>{`${isSearch ? `Results ` : `All people `}( ${matches} )`}</h4>
      <Sort />
    </header>
  );
};

const EmptyListMessage: React.FC = (): React.ReactElement => {
  return (
    <div className='EmptyList'>
      <p>Nothing to show here...</p>
      <Link to='/add' className='EmptyList-add'>
        Add the first person <PersonAdd />
      </Link>
    </div>
  )
};

const PersonItem: React.FC<{person: Person}> = ({ person }) => {

  return (
    <li className='People-person' key={person.id}>
      <article className='List-item'>
        <Link to={`/person/${person.id}`} className='List-item-link'>
          <header className='List-item-header'>
            <h2 className='List-item-header-name'>{person.name}</h2>
          </header>
          <div className='List-item-body'>
            <div className='List-item-body-image'>
              <img
                src={person.imageURL || defaultUserImage}
                alt={person.name}
              />
            </div>
            <div className='List-item-body-info'>
              <p className='List-item-body-info-age'>Age: {person.age}</p>
              {person.phone && (
                <p className='List-item-body-info-phone'>Phone: {person.phone}</p>
              )}
              {person.note && (
                <p className='List-item-body-info-note'>"{person.note}"</p>
              )}
            </div>
          </div>
        </Link>
      </article>
    </li>
  )
};

const List: React.FC = (): React.ReactElement => {
  const { isSearch, filtered } = usePeopleContext();
  const matches = filtered.length;

  return (
    <section className='List'>
      <Header isSearch={isSearch} matches={matches}/>
      <div className='List-body'>
        {matches ? (
          <ul className='People'>
            {filtered.map((person: Person) => (
              <PersonItem person={person} key={person.id}/>
            ))}
          </ul>
        ) : (
          <EmptyListMessage />
        )}
      </div>
    </section>
  )
}

export default List
