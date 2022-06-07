import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import {
  StyledForm,
  StyledInput,
  SubmitButton,
  Checkbox,
  RegistrationFormContainer,
} from './RegistrationForm.styles';
import { useApi } from '../../hooks/useApi';
import { createUser } from '../../api/requests';

const formValidate = (values) => {
  if (values.firstname.length < 3) {
    return false;
  }

  if (values.lastname.length < 4) {
    return false;
  }

  if (!values.email.includes('@')) {
    return false;
  }

  if (values.password.length < 7) {
    return false;
  }

  if (!values.regulations) {
    return false;
  }

  return true;
};

const RegistrationForm = () => {
  const [{ isLoading }, createUserRequest] = useApi(createUser);

  const inputRef = useRef(); // { current: }
  const firstNameId = useRef(nanoid());
  const lastNameId = useRef(nanoid());
  const emailId = useRef(nanoid());
  const phoneId = useRef(nanoid());
  const usernameId = useRef(nanoid());
  const passwordId = useRef(nanoid());
  const regulationsId = useRef(nanoid());

  const [formValues, setFormValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    username: '',
    phone: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, password, username, firstname, lastname, phone } =
      formValues;

    createUserRequest({
      email,
      password,
      username,
      phone,
      name: {
        firstname,
        lastname,
      },
      address: {
        city: 'test',
        street: 'test',
        number: 3,
        zipcode: '12926-3874',
        geolocation: {
          lat: '-37.3159',
          long: '81.1496',
        },
      },
    });
  };

  const handleInputValueChange = (event) => {
    setFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheckboxValueChange = (event) => {
    setFormValues((prevState) => ({
      ...prevState,
      regulations: event.target.checked,
    }));
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const isSubmitButtonEnabled = formValidate(formValues);

  return (
    <RegistrationFormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor={firstNameId.current}>First name:</label>
        <StyledInput
          ref={inputRef}
          id={firstNameId.current}
          name="firstname"
          placeholder="First name"
          value={formValues.firstname}
          onChange={handleInputValueChange}
        />

        <label htmlFor={lastNameId.current}>Last name:</label>
        <StyledInput
          id={lastNameId.current}
          name="lastname"
          placeholder="Last name"
          value={formValues.lastname}
          onChange={handleInputValueChange}
        />

        <label htmlFor={phoneId.current}>Phone number:</label>
        <StyledInput
          id={phoneId.current}
          name="phone"
          placeholder="Phone number"
          value={formValues.phone}
          type="tel"
          onChange={handleInputValueChange}
        />

        <label htmlFor={emailId.current}>Email address:</label>
        <StyledInput
          id={emailId.current}
          name="email"
          placeholder="Email address"
          value={formValues.email}
          type="email"
          onChange={handleInputValueChange}
        />

        <label htmlFor={usernameId.current}>Username:</label>
        <StyledInput
          id={usernameId.current}
          name="username"
          placeholder="Username"
          value={formValues.username}
          onChange={handleInputValueChange}
        />

        <label htmlFor={passwordId.current}>Password:</label>
        <StyledInput
          id={passwordId.current}
          name="password"
          placeholder="Password"
          type="password"
          value={formValues.password}
          onChange={handleInputValueChange}
        />

        <Checkbox>
          <label htmlFor={regulationsId}>Accept Regulations:</label>
          <input
            id={regulationsId}
            type="checkbox"
            name="regulations"
            value={formValues.regulations}
            onChange={handleCheckboxValueChange}
          />
        </Checkbox>

        <SubmitButton
          type="submit"
          appearance="primary"
          disabled={!isSubmitButtonEnabled || isLoading}
        >
          Submit
        </SubmitButton>
      </StyledForm>
    </RegistrationFormContainer>
  );
};

export default RegistrationForm;
