import styled from 'styled-components';

export const CartPopup = styled.div`
  position: fixed;
  inset: 0;
  width: fit-content;
  min-width: 500px;
  height: fit-content;
  margin: auto;
  border: 1px solid black;
  padding: 20px;
  background: white;
  box-shadow: rgb(0 0 0 / 25%) 0px 2px 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CartItem = styled.div`
  margin: 10px 0;
  display: flex;
  gap: 10px;
`;
