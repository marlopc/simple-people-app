import '../styles/Form.css';
import React, { useEffect, useState } from 'react'
import { Person } from '../App';

export interface Props {
  people: Person[],
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>
}

interface PersonForm {
  name: string,
  age: string,
  imageURL: string,
  note: string,
}

const initialForm: PersonForm = {
  name: '',
  age: '',
  imageURL: '',
  note: '',
};

const Form: React.FC<Props> = ({ people, setPeople }) => {
  const [form, setForm] = useState(initialForm);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if(showSuccessMessage || showErrorMessage) {
      timeout = setTimeout(() => {
        setShowErrorMessage(false);
        setShowSuccessMessage(false)
      }, 3500);
    }

    return () => clearTimeout(timeout);
  }, [showSuccessMessage, showErrorMessage]);

  const generateId = (): number => {
    const id = Math.floor(Math.random() * 100000);
    const isUsedId = people.some((person) => person.id === id);
  
    return isUsedId ? generateId() : id;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const { note, ...requiredFields } = form;
    const anyRequiredFieldIsEmpty = Object
      .values(requiredFields)
      .some((value) => value === '');

    if(anyRequiredFieldIsEmpty) {
      setShowErrorMessage(true);
      return;
    }

    const newPerson: Person = {
      ...form,
      age: Number(form.age),
      id: generateId(),
    };

    setShowSuccessMessage(true);
    setForm(initialForm);

    setPeople([
      ...people,
      newPerson,
    ]);
  };

  return (
    <form className='Form' onSubmit={handleSubmit}>
      <label htmlFor='name' className='Form-label'>Name*</label>
      <input
        id='name'
        className='Form-input'
        name='name'
        onChange={handleChange}
        type='text'
        value={form.name}
      />
      <label htmlFor='age' className='Form-label'>Age*</label>
      <input
        id='age'
        className='Form-input'
        name='age'
        onChange={handleChange}
        type='number'
        min='0'
        value={form.age}
      />
      <label htmlFor='imageURL' className='Form-label'>Image URL*</label>
      <input
        id='imageURL'
        className='Form-input'
        name='imageURL'
        onChange={handleChange}
        type='text'
        value={form.imageURL}
      />
      <label htmlFor='note' className='Form-label'>Note</label>
      <textarea
        id='note'
        className='Form-textarea'
        onChange={handleChange}
        name='note'
        value={form.note}
      />
      <button
        className='Form-submit'
        type='submit'
      >
        ADD TO LIST
      </button>
      {(showErrorMessage && !showSuccessMessage) && (
        <p className='Form-error'>Required fields are missing!</p>
      )}
      {showSuccessMessage && (
        <p className='Form-success'>New person submitted!</p>
      )}
    </form>
  )
}

export default Form
