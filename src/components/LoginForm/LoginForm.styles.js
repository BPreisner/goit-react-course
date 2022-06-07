import styled from 'styled-components';
import { Button } from 'rsuite';

export const LoginFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledForm = styled.form`
  padding: 15px;
  display: flex;
  flex-direction: column;
  width: 500px;
`;

export const StyledInput = styled.input`
  border: none;
  outline: none;
  box-shadow: none;
  padding: 10px 12px;
  color: #444;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 24px;
  margin-top: 8px;

  &:focus-within {
    border-color: #1997d6;
  }

  &:focus {
    color: #222;
  }

  &::placeholder {
    color: #8d8d8d;
  }
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
`;
