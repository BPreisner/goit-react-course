import { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
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
import { getItemsById, getItemsList } from '../../store/Cart/selectors';

const calculateTotalPrice = (cartItemsList, cartItemsById) => {
  return cartItemsList.reduce((acc, id) => {
    return (acc += cartItemsById[id].price * cartItemsById[id].count);
  }, 0);
};

const Cart = ({ onRemoveProductFromCart }) => {
  const cartItemsList = useSelector(getItemsList);
  const cartItemsById = useSelector(getItemsById);
  const {
    isOpen: isCartDialogOpen,
    close: closeCartDialog,
    open: openCartDialog,
  } = useToggle();
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const totalPrice = useMemo(
    () => calculateTotalPrice(cartItemsList, cartItemsById),
    [cartItemsList, cartItemsById],
  );

  const isCartEmpty = cartItemsList.length === 0;
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
                {cartItemsList.map((id) => (
                  <StyledCartItem key={id} index={id}>
                    {cartItemsById[id].title}
                    <div>{cartItemsById[id].count}</div>
                    <Price>{cartItemsById[id].price} $</Price>
                    <StyledIconButton
                      circle
                      icon={<FaTrashAlt />}
                      color="red"
                      appearance="primary"
                      size="md"
                      onClick={onRemoveProductFromCart(id)}
                    />
                  </StyledCartItem>
                ))}
              </StyledCartItemsList>
              <TotalPriceWrapper>
                Total price: <Price>{totalPrice.toFixed(2)} $</Price>
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
  onRemoveProductFromCart: PropTypes.func.isRequired,
};

export default Cart;
