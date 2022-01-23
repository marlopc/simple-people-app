import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Close from '../components/icons/Close';
import Edit from '../components/icons/Edit';
import { usePeopleContext } from '../contexts/PeopleStorage';
import '../styles/Person.css';
import defaultUserImage from '../assets/default-user.jpg';
import ArrowBack from '../components/icons/ArrowBack';

const Person = () => {
  const { get, remove } = usePeopleContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const person = get(Number(id));

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!person) return;

    remove(person?.id);
    navigate('/');
  };

  const date = person ? new Date(person.timestamp).toLocaleString() : '';

  return (
    <main>
      <header className='route-header'>
        <button className='rounded' onClick={() => navigate('/')}>
          <ArrowBack />
        </button>
      </header>
      {person && (
        <div className='Person'>
          <header className='Person-header'>
            <div className='Person-header-image'>
              <img src={person.imageURL || defaultUserImage} alt={person.name}/>
            </div>
          </header>
          <div className='Person-info'>
            <h1 className='Person-info-name'>{person.name}</h1>
            <ul className='Person-info-list'>
              <li>
                <p>Age: {person.age}</p>
              </li>
              {person.phone && (
                <li>
                  <p>Phone: {person.phone}</p>
                </li>
              )}
              {person.note && (
                <li>
                  <p>"{person.note}"</p>
                </li>
              )}
            </ul>
            <small className='Person-date'>Last update: {date}</small>
          </div>
          <div className='Person-actions'>
            <Link to={`/edit/${person.id}`} className='Person-actions-edit'>
              <Edit /> Edit
            </Link>
            <button className='Person-actions-remove' onClick={handleRemove}>
              <Close /> Remove
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Person;
