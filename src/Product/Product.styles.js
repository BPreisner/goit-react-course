import styled, { css } from 'styled-components';

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid grey;
  margin: 0 20px;
`;

export const ProductImage = styled.img`
  width: 400px;
  height: 200px;
  object-fit: cover;
`;

export const Button = styled.button`
  color: ${({ isActive }) => isActive && 'white'};
  border: none;
  background: green;
  border-radius: 20px;
  padding: 10px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 50px;
  cursor: pointer;

  &:not(:disabled) {
    &:hover {
      transform: scale(1.1);
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

const commonStylesForText = css`
  font-weight: bold;
  color: grey;
`;

export const Text = styled.p`
  ${commonStylesForText};

  color: ${({ isOutOfStock }) => isOutOfStock && 'red'};
`;

export const Price = styled.p`
  ${commonStylesForText};

  color: green;
`;
