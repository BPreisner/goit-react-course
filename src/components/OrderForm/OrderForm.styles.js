import styled from 'styled-components';

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

export const Checkbox = styled.div``;

export const SubmitButton = styled.button`
  border: none;
  background-color: #3997d6;
  border-radius: 20px;
  padding: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
  cursor: pointer;

  &:not(:disabled) {
    &:hover {
      color: white;
      opacity: 0.9;
    }

    &:active {
      transform: none;
    }
  }

  &:disabled {
    background-color: grey;
    color: black;
    cursor: not-allowed;
  }
`;
