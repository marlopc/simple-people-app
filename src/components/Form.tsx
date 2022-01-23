import '../styles/Form.css';
import React from 'react'
import { Person } from '../App';
import { usePeopleContext } from '../contexts/PeopleStorage';
import useForm from '../hooks/useForm';
import ArrowBack from './icons/ArrowBack';
import { useNavigate } from 'react-router-dom';

export interface PersonForm {
  form: {
    id?: number,
    name: string,
    age: string,
    imageURL: string,
    phone?: string,
    note?: string,
  };
  fields: 'name' | 'age' | 'imageURL' | 'note' | 'phone';
}

const initialForm: PersonForm['form'] = {
  name: '',
  age: '',
  imageURL: '',
  note: '',
  phone: '',
};

const Form: React.FC<{toEditPerson?: PersonForm['form'], isEdit?: boolean}> = ({
  toEditPerson,
  isEdit = false,
}) => {
  const [form, setForm] = React.useState(toEditPerson || initialForm);
  const [errors, setErrors] = React.useState(initialForm);
  const [currentFocus, setCurrentFocus] = React.useState<PersonForm['fields'] | null>(null);
  const validateForm = useForm();
  const people = usePeopleContext();
  const navigate = useNavigate();

  const generateId = (): number => {
    const id = Math.floor(Math.random() * 100000);
    const isUsedId = people?.storage.some((person: Person) => person.id === id);
  
    return isUsedId ? generateId() : id;
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;

    setCurrentFocus(name as PersonForm['fields']);
  };

  const handleBlur = () => {
    setCurrentFocus(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(!/[0-9]/.test(e.key)) {
      e.preventDefault();
      return;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const newErrors = validateForm(form, errors);

    if(Object.keys(newErrors).length) {
      setErrors(newErrors);
      setTimeout(() => setErrors(initialForm), 5000);
      return;
    }

    const person: Person = {
      ...form,
      age: Number(form.age),
      id: form.id || generateId(),
      timestamp: new Date().getTime(),
    };

    setForm(initialForm);

    isEdit ? people?.edit(person) : people?.append(person);
    navigate('/');
  };

  const getLabelClassName = (name: PersonForm['fields']): string => {
    let className = 'Form-label';

    if(form[name] !== '') className = className.concat(' Form-label_filled');
    if(currentFocus === name) className = className.concat(' Form-label_focus');
    if(errors[name]) className = className.concat(' Form-label_error');

    return className;
  };

  return (
    <>
      <header className='route-header'>
        <button className='rounded' onClick={() => navigate('/')}>
          <ArrowBack />
        </button>
        <h1>{isEdit ? 'Edit contact' : 'New contact'}</h1>
      </header>
      <form className='Form' onSubmit={handleSubmit}>
        <label
          htmlFor='name'
          className={getLabelClassName('name')}
        >
          Full name
        </label>
        <input
          id='name'
          className={`Form-input ${errors.name ? 'Form-input_error' : ''}`}
          name='name'
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type='text'
          value={form.name}
        />
        <p className='Form-input-error'>{errors.name}</p>
        <label
          htmlFor='age'
          className={getLabelClassName('age')}
        >
          Age
        </label>
        <input
          id='age'
          className={`Form-input ${errors.age ? 'Form-input_error' : ''}`}
          name='age'
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onPaste={(e) => e.preventDefault()}
          type='number'
          min='0'
          max='150'
          value={form.age}
        />
        <p className='Form-input-error'>{errors.age}</p>
        <label
          htmlFor='imageURL'
          className={getLabelClassName('imageURL')}
        >
          Image URL
        </label>
        <input
          id='imageURL'
          className={`Form-input ${errors.imageURL ? 'Form-input_error' : ''}`}
          name='imageURL'
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type='text'
          value={form.imageURL}
        />
        <p className='Form-input-error'>{errors.imageURL}</p>
        <label
          htmlFor='phone'
          className={getLabelClassName('phone')}
        >
          Phone number
        </label>
        <input
          id='phone'
          className={`Form-input ${errors.phone ? 'Form-input_error' : ''}`}
          name='phone'
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type='tel'
          value={form.phone}
        />
        <p className='Form-input-error'>{errors.phone}</p>
        <label
          htmlFor='note'
          className={getLabelClassName('note')}
        >
          Note
        </label>
        <textarea
          id='note'
          className={`Form-textarea ${errors.note ? 'Form-textarea_error' : ''}`}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          name='note'
          value={form.note}
        />
        <p className='Form-input-error'>{errors.note}</p>
        <button
          className='Form-submit'
          type='submit'
        >
          {isEdit ? 'Edit' : 'Add to list'}
        </button>
      </form>
    </>
  )
}

export default Form
