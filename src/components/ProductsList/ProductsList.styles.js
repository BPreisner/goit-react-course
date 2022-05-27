import styled from 'styled-components';
import { Button } from 'rsuite';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NavBarContent = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const StyledProductsList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 16%;
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
