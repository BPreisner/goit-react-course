import { Navbar, Nav } from 'rsuite';
import { Outlet, useNavigate, useMatch } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Layout = () => {
  const navigate = useNavigate();
  const home = useMatch('/');
  const login = useMatch('/login');
  const registration = useMatch('/registration');
  const products = useMatch('/products');

  const onSelect = (path) => {
    navigate(path);
  };

  return (
    <>
      <Navbar appearance="inverse">
        <Nav onSelect={onSelect}>
          <Nav.Item active={!!home} eventKey="/">
            Home
          </Nav.Item>
          <Nav.Item active={!!login} eventKey="/login">
            Login
          </Nav.Item>
          <Nav.Item active={!!registration} eventKey="/registration">
            Registration
          </Nav.Item>
          <Nav.Item active={!!products} eventKey="/products">
            Products List
          </Nav.Item>
        </Nav>

        <Nav pullRight>
          <Nav.Item icon={<FaShoppingCart />}>Cart</Nav.Item>
        </Nav>
      </Navbar>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
