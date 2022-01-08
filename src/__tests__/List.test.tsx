import List, { Props } from '../components/List';
import { Person } from '../App';

import { 
  fireEvent, 
  screen, 
  render, 
  cleanup 
} from '@testing-library/react';

const renderList = (props: Partial<Props> = {}): void => {
  const defaultProps = {
    people: [],
    setPeople: () => {},
  };

  render(<List {...defaultProps} {...props}/>);
};

const getMockedPerson = (props: Partial<Person> = {}): Person => {
  const defaultPerson: Person = {
    id: 7357,
    age: 22,
    imageURL: 'https://test.com/person.jpg',
    name: 'Test Name',
    note: 'test note',
  };

  return {
    ...defaultPerson,
    ...props,
  };
};

describe('List component', () => {
  afterEach(cleanup);

  test('renders one list item correctly', () => {
    const mockedPerson = getMockedPerson();
    const people: Person[] = [mockedPerson];

    renderList({ people });

    const imageElement = screen.getByAltText(mockedPerson.name);
    const nameElement = screen.getByText(mockedPerson.name);
    const ageElement = screen.getByText(`Age: ${mockedPerson.age}`);
    const noteElement = screen.getByText(mockedPerson.note!);

    expect(imageElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(ageElement).toBeInTheDocument();
    expect(noteElement).toBeInTheDocument();
  });

  test('renders multiple list items correctly', () => {
    const people: Person[] = [
      getMockedPerson(), 
      getMockedPerson({ 
        id: 7358,
        name: 'Test Name 2',
        note: 'test note 2',
        age: 23,
      }),
    ];

    renderList({ people });

    const peopleNameElements = screen.getAllByText(/Test Name/i);
    const peopleAgeElements = screen.getAllByText(/Age: /i);
    const peopleNoteElements = screen.getAllByText(/test note/i);
    
    expect(peopleNameElements).toHaveLength(2);
    expect(peopleAgeElements).toHaveLength(2);
    expect(peopleNoteElements).toHaveLength(2);

    peopleNameElements.forEach((personNameElement) => {
      expect(personNameElement).toBeInTheDocument();
    });

    peopleAgeElements.forEach((personAgeElement) => {
      expect(personAgeElement).toBeInTheDocument();
    });

    peopleNoteElements.forEach((personNoteElement) => {
      expect(personNoteElement).toBeInTheDocument();
    });
  });

  test('people\'s \'setState\' is called when the remove button is pressed', () => {
    const people: Person[] = [getMockedPerson()];
    
    const setPeople = jest.fn();

    renderList({ people, setPeople });
    
    const removeButton = screen.getByText('X');
    fireEvent.click(removeButton);
    expect(setPeople).toHaveBeenCalledTimes(1);
  });
});