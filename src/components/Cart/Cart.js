import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Message } from 'rsuite';
import {
  StyledIconButton,
  StyledCartItemsList,
  StyledCartItem,
  Price,
} from './Cart.styles';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      isCartDialogOpen: false,
      isNotificationVisible: false,
    };
  }

  static propTypes = {
    cartItems: PropTypes.arrayOf(
      PropTypes.exact({
        title: PropTypes.string,
        price: PropTypes.number,
        id: PropTypes.number,
      }),
    ).isRequired,
  };

  handleOpenCartDialog = () => {
    this.setState({
      isCartDialogOpen: true,
    });
  };

  handleCloseCartDialog = () => {
    this.setState({
      isCartDialogOpen: false,
    });
  };

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ isNotificationVisible: true });
    }, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { cartItems } = this.props;
    const isCartEmpty = cartItems.length === 0;

    return (
      <>
        <StyledIconButton
          circle
          icon={<FaShoppingCart />}
          color="green"
          appearance="primary"
          size="lg"
          onClick={this.handleOpenCartDialog}
        />

        <Modal
          open={this.state.isCartDialogOpen}
          onClose={this.handleCloseCartDialog}
        >
          <Modal.Header>
            <Modal.Title>Cart items</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.isNotificationVisible && (
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
                      onClick={this.handleOpenCartDialog}
                    />
                  </StyledCartItem>
                ))}
              </StyledCartItemsList>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseCartDialog} appearance="subtle">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Cart;
