import { useState, useEffect, useRef, useMemo } from 'react';
import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Modal, Button, Message } from 'rsuite';
import {
  StyledIconButton,
  StyledCartItemsList,
  StyledCartItem,
  Price,
  TotalPriceWrapper,
} from './Cart.styles';
import { useToggle } from '../../hooks/useToggle';

const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((acc, curr) => {
    return (acc += curr.price);
  }, 0);
};

const Cart = ({ cartItems }) => {
  const {
    isOpen: isCartDialogOpen,
    close: closeCartDialog,
    open: openCartDialog,
  } = useToggle();
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const totalPrice = useMemo(() => calculateTotalPrice(cartItems), [cartItems]);

  const isCartEmpty = cartItems.length === 0;
  const setTimeoutRef = useRef(null); // { current: null }

  useEffect(() => {
    if (isCartDialogOpen) {
      setTimeoutRef.current = setTimeout(() => {
        setIsNotificationVisible(true);
      }, 5000);
    }

    return () => {
      clearTimeout(setTimeoutRef.current);
    };
  }, [isCartDialogOpen]);

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
            <>
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
              <TotalPriceWrapper>
                Total price: <Price>{totalPrice} $</Price>
              </TotalPriceWrapper>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleCloseCartDialog}
            appearance="primary"
            color="green"
          >
            Proceed to checkout
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
