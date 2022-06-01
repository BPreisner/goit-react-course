import { useState, useEffect } from 'react';
import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Modal, Button, Message } from 'rsuite';
import {
  StyledIconButton,
  StyledCartItemsList,
  StyledCartItem,
  Price,
} from './Cart.styles';
import { useToggle } from '../../hooks/useToggle';

const Cart = ({ cartItems }) => {
  const {
    isOpen: isCartDialogOpen,
    close: closeCartDialog,
    open: openCartDialog,
  } = useToggle();
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const isCartEmpty = cartItems.length === 0;
  let timeout = null;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    timeout = setTimeout(() => {
      setIsNotificationVisible(true);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleOpenCartDialog = () => {
    openCartDialog();
  };

  const handleCloseCartDialog = () => {
    closeCartDialog();
  };

  return (
    <>
      <StyledIconButton
        circle
        icon={<FaShoppingCart />}
        color="green"
        appearance="primary"
        size="lg"
        onClick={handleOpenCartDialog}
      />

      <Modal open={isCartDialogOpen} onClose={handleCloseCartDialog}>
        <Modal.Header>
          <Modal.Title>Cart items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isNotificationVisible && (
            <Message type="success">
              Congratulations! Here is your special promo code: 'fs#Rsf513'
            </Message>
          )}

          {isCartEmpty ? (
            <h4>Your cart is empty.</h4>
          ) : (
            <StyledCartItemsList bordered>
              {cartItems.map((item, index) => (
                <StyledCartItem key={item.id + index} index={index}>
                  {item.title}
                  <Price>{item.price} $</Price>
                  <StyledIconButton
                    circle
                    icon={<FaTrashAlt />}
                    color="red"
                    appearance="primary"
                    size="md"
                    onClick={handleOpenCartDialog}
                  />
                </StyledCartItem>
              ))}
            </StyledCartItemsList>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseCartDialog} appearance="subtle">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string,
      price: PropTypes.number,
      id: PropTypes.number,
    }),
  ).isRequired,
};

export default Cart;
