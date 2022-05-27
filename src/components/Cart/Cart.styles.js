import styled from 'styled-components';
import { IconButton, List } from 'rsuite';

export const StyledIconButton = styled(IconButton)`
  display: flex;
`;

export const StyledCartItemsList = styled(List)`
  margin: 10px;
`;

export const StyledCartItem = styled(List.Item)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

export const Price = styled.p`
  font-weight: bold;
  color: green;
  min-width: 70px;
  text-align: right;
`;
