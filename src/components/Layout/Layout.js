import { Navbar, Nav } from 'rsuite';
import { Outlet, useNavigate, useMatch } from 'react-router-dom';
import { FaShoppingCart, FaDoorClosed } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/Auth/actions';

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const home = useMatch('/');
  const products = useMatch('/products');

  const onSelect = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <Navbar appearance="inverse">
        <Nav onSelect={onSelect}>
          <Nav.Item active={!!home} eventKey="/">
            Home
          </Nav.Item>
          <Nav.Item active={!!products} eventKey="/products">
            Products List
          </Nav.Item>
        </Nav>

        <Nav pullRight>
          <Nav.Item icon={<FaDoorClosed />} onClick={handleLogout}>
            Logout
          </Nav.Item>
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
