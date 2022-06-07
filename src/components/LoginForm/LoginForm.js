import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import {
  StyledForm,
  StyledInput,
  SubmitButton,
  LoginFormContainer,
} from './LoginForm.styles';
import { useApi } from '../../hooks/useApi';
import { useAuthneticationContext } from '../AuthenticationProvider/AuthenticationProvider';
import { authenticateUser } from '../../api/requests';

const LoginForm = () => {
  const authneticationContext = useAuthneticationContext();
  const [{ data, isLoading }, login] = useApi(authenticateUser);
  const navigate = useNavigate();

  const usernameId = useRef(nanoid());
  const passwordId = useRef(nanoid());

  const [formValues, setFormValues] = useState({
    password: '',
    username: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    login({
      password: 'William56$hj',
      username: 'hopkins',
    });
  };

  const handleInputValueChange = (event) => {
    setFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (data.token) {
      authneticationContext.setIsUserAuthenticated(true);

      navigate('/products');
    }
  }, [data, authneticationContext, navigate]);

  return (
    <LoginFormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor={usernameId.current}>Username:</label>
        <StyledInput
          autoFocus
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

        <SubmitButton
          appearance="primary"
          type="submit"
          disabled={isLoading || !formValues.password || !formValues.username}
        >
          Submit
        </SubmitButton>
      </StyledForm>
    </LoginFormContainer>
  );
};

export default LoginForm;
