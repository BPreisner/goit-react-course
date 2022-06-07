import styled from 'styled-components';
import { Panel, Button } from 'rsuite';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

export const ProductPanel = styled(Panel)`
  margin: 10px 0;
`;

export const ProductWrapper = styled.div`
  display: flex;
`;

export const ProductImage = styled.img`
  width: 200px;
  height: 200px;
  flex: 0 0 auto;
  object-fit: contain;
  margin: 20px;
`;

export const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Text = styled.p``;

export const Price = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 5px;
  color: green;
  align-self: flex-end;
`;

export const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  align-self: flex-end;
  font-size: 16px;
  padding: 10px 20px;
`;
