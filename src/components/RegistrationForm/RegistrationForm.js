import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import {
  StyledForm,
  StyledInput,
  SubmitButton,
  RegistrationFormContainer,
} from './RegistrationForm.styles';
import { createUser } from '../../store/Auth/actions';
import { selectUserRequestStatus } from '../../store/Auth/selectors';
import { useDispatch, useSelector } from 'react-redux';

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

  return true;
};

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const userRequestStatus = useSelector(selectUserRequestStatus);

  const navigate = useNavigate();

  const inputRef = useRef(); // { current: }
  const firstNameId = useRef(nanoid());
  const lastNameId = useRef(nanoid());
  const emailId = useRef(nanoid());
  const passwordId = useRef(nanoid());

  const [formValues, setFormValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, password, firstname, lastname } = formValues;

    dispatch(
      createUser({
        name: `${firstname} ${lastname}`,
        email,
        password,
      }),
    );
  };

  const handleInputValueChange = (event) => {
    setFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (userRequestStatus === 'success') {
      navigate('/');
    }
  }, [userRequestStatus, navigate]);

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

        <label htmlFor={emailId.current}>Email address:</label>
        <StyledInput
          id={emailId.current}
          name="email"
          placeholder="Email address"
          value={formValues.email}
          type="email"
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

        <SubmitButton
          type="submit"
          appearance="primary"
          disabled={!isSubmitButtonEnabled || userRequestStatus === 'fetching'}
        >
          Submit
        </SubmitButton>
      </StyledForm>
    </RegistrationFormContainer>
  );
};

export default RegistrationForm;
