import { PersonForm } from "../components/Form";

const requiredFields = ["name", "age"];

const useForm = () => {
  const validateForm = (form: PersonForm["form"], errors: any) => {
    let newErrors = { ...errors };

    Object.entries(form).forEach((entry) => {
      if (requiredFields.includes(entry[0])) {
        if (!entry[1]) {
          newErrors[entry[0]] = "Required field";
        } else {
          delete newErrors[entry[0]];
        }
      } else {
        delete newErrors[entry[0]];
      }
    });

    if (form.imageURL) {
      if (
        !form.imageURL.startsWith("https://") &&
        !form.imageURL.startsWith("http://")
      ) {
        if (!newErrors.imageURL) newErrors.imageURL = "Invalid URL";
      } else {
        delete newErrors.imageURL;
      }
    } else {
      delete newErrors.imageURL;
    }

    return newErrors;
  };

  return validateForm;
};

export default useForm;
