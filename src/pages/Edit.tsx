import { useParams } from "react-router-dom";
import Form from "../components/Form";
import { usePeopleContext } from "../contexts/PeopleStorage";
import '../styles/Edit.css';

const Edit = () => {
  const { get } = usePeopleContext();
  const { id } = useParams();

  const person = get(Number(id));

  if(!person) return null;

  const { timestamp, ...editable } = person;

  return (
    <main>
      {person && (
        <Form
          toEditPerson={{...editable, age: person.age.toString(), imageURL: person.imageURL || ''}}
          isEdit
        />
      )}
    </main>
  );
};

export default Edit;
