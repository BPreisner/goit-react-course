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
  display: inline-block;
  font-weight: bold;
  color: green;
  min-width: 70px;
  text-align: right;
`;

export const TotalPriceWrapper = styled.div`
  padding: 12px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  font-weight: bold;
  font-size: 20px;
`;
