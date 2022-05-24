import { Component } from 'react';
import PropTypes from 'prop-types';
import { CartPopup, CartItem } from './Cart.styles';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      isNotificationVisible: false,
    };
  }

  static propTypes = {
    cartItems: PropTypes.arrayOf(
      PropTypes.exact({
        name: PropTypes.string,
        price: PropTypes.number,
        id: PropTypes.string,
      }),
    ).isRequired,
    onCartClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ isNotificationVisible: true });
    }, 2000);
  }

  componentDidUpdate() {
    console.log('Cart component updated');
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { cartItems, onCartClose } = this.props;
    const isCartEmpty = cartItems.length === 0;

    return (
      <CartPopup>
        <button onClick={onCartClose}>Close</button>

        {isCartEmpty ? (
          <h3>Your cart is empty.</h3>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <CartItem key={item.id + index}>
                {item.name} {item.price}
                <button>Remove from cart</button>
              </CartItem>
            ))}
          </div>
        )}

        {this.state.isNotificationVisible && (
          <CartPopup>
            Congratulations! Here is your promo code: 'fs#Rsf513'
          </CartPopup>
        )}
      </CartPopup>
    );
  }
}

export default Cart;
