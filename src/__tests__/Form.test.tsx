import Form, { Props } from '../components/Form';

import userEvent from '@testing-library/user-event';
import { 
  cleanup, 
  fireEvent, 
  render, 
  RenderResult, 
  screen 
} from '@testing-library/react';

const renderForm = (props: Partial<Props> = {}): RenderResult => {
  const defaultProps: Props = {
    people: [],
    setPeople: () => {},
  };

  return render(<Form {...defaultProps} {...props} />)
};

const typeValidForm = (): void => {
  const nameInput = screen.getByLabelText('Name*');
  const ageInput = screen.getByLabelText('Age*');
  const imageInput = screen.getByLabelText('Image URL*');

  userEvent.type(nameInput, 'Test Name');
  userEvent.type(ageInput, '22');
  userEvent.type(imageInput, 'https://test.com/person.jpg');
};

describe('Form component', () => {
  afterEach(cleanup);

  test('renders', () => {
    renderForm();
    const nameInput = screen.getByLabelText('Name*');
    const SubmitButton = screen.getByText('ADD TO LIST');

    expect(nameInput).toBeInTheDocument();
    expect(SubmitButton).toBeInTheDocument();
  });

  test('\'name\' input changes', () => {
    renderForm();
    const nameInput = screen.getByLabelText('Name*');
    userEvent.type(nameInput, 'Person Name');
    
    expect(nameInput).toHaveValue('Person Name');
  });

  test('\'age\' input changes', () => {
    renderForm();
    const ageInput = screen.getByLabelText('Age*');
    userEvent.type(ageInput, '22');
    
    expect(ageInput).toHaveValue(22);
  });

  test('\'image\' input changes', () => {
    renderForm();
    const imageInput = screen.getByLabelText('Image URL*');
    userEvent.type(imageInput, 'https://test.com/person.jpg');
    
    expect(imageInput).toHaveValue('https://test.com/person.jpg');
  });

  test('\'note\' input changes', () => {
    renderForm();
    const noteTextarea = screen.getByLabelText('Note');
    userEvent.type(noteTextarea, 'Test note');
    
    expect(noteTextarea).toHaveValue('Test note');
  });

  test('prevents invalid forms to make changes to the list', () => {
    const setPeople = jest.fn();

    renderForm({ setPeople });
    
    const submitButton = screen.getByText('ADD TO LIST');
    fireEvent.click(submitButton);

    expect(setPeople).not.toHaveBeenCalled();
  });

  test('shows error when is submitted with an invalid form', () => {
    renderForm();

    const submitButton = screen.getByText('ADD TO LIST');
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Required fields are missing!');
    expect(errorMessage).toBeInTheDocument();
  });

  test('people\'s \'setState\' is called when is submitted with a valid form', () => {
    const setPeople = jest.fn();

    renderForm({ setPeople });

    typeValidForm();
    
    const submitButton = screen.getByText('ADD TO LIST');
    fireEvent.click(submitButton);

    expect(setPeople).toHaveBeenCalledTimes(1);
  });

  test('shows success message when is submitted with a valid form', () => {
    renderForm();

    typeValidForm();

    const submitButton = screen.getByText('ADD TO LIST');
    fireEvent.click(submitButton);

    const successMessage = screen.getByText('New person submitted!');
    expect(successMessage).toBeInTheDocument();
  });

  test('clears the form after submitting a valid form', () => {
    renderForm();

    typeValidForm();

    const submitButton = screen.getByText('ADD TO LIST');
    fireEvent.click(submitButton);

    const nameInput = screen.getByLabelText('Name*');
    const ageInput = screen.getByLabelText('Age*');
    const imageInput = screen.getByLabelText('Image URL*');
    const noteInput = screen.getByLabelText('Note');


    expect(nameInput).toHaveValue('');
    expect(ageInput).toHaveValue(null);
    expect(imageInput).toHaveValue('');
    expect(noteInput).toHaveValue('');
  });
});
