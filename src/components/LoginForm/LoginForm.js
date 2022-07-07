import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import {
  StyledForm,
  StyledInput,
  SubmitButton,
  LoginFormContainer,
} from './LoginForm.styles';
import { loginUser } from '../../store/Auth/actions';
import { selectUserRequestStatus } from '../../store/Auth/selectors';

const LoginForm = () => {
  const dispatch = useDispatch();
  const userRequestStatus = useSelector(selectUserRequestStatus);

  const usernameId = useRef(nanoid());
  const passwordId = useRef(nanoid());

  const [formValues, setFormValues] = useState({
    password: '',
    email: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = formValues;

    dispatch(
      loginUser({
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

  return (
    <LoginFormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor={usernameId.current}>Email:</label>
        <StyledInput
          autoFocus
          id={usernameId.current}
          name="email"
          placeholder="Email"
          value={formValues.email}
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

        <Link to="/registration">Didn't have account? Register instead</Link>

        <SubmitButton
          appearance="primary"
          type="submit"
          disabled={
            userRequestStatus === 'fetching' ||
            !formValues.password ||
            !formValues.email
          }
        >
          Submit
        </SubmitButton>
      </StyledForm>
    </LoginFormContainer>
  );
};

export default LoginForm;
