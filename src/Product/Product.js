import { Component } from 'react';
import {
  getProductQuantityMessage,
  productImageNotAvailableUrl,
} from './Product.utils';
import {
  ProductWrapper,
  Button,
  Text,
  Price,
  ProductImage,
} from './Product.styles';
import PropTypes from 'prop-types';
import { FaCartPlus } from 'react-icons/fa';

class Product extends Component {
  static defaultProps = {
    imgUrl: productImageNotAvailableUrl,
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    imgUrl: PropTypes.string,
    onProductClick: PropTypes.func.isRequired,
  };

  render() {
    const { imgUrl, name, price, quantity, onProductClick } = this.props;

    console.log(this.props.name, ' rendered');

    const quantityMessage = getProductQuantityMessage(quantity);
    const amount = `${price ? price : 'Priceless :)'}`;
    const currency = !!price && '$';
    const isAddToCardActive = quantity > 0;

    return (
      <ProductWrapper>
        <ProductImage src={imgUrl} alt={name} />
        <h1>{name}</h1>
        <Price>
          Price: {amount}
          {currency}
        </Price>
        <Text isOutOfStock={!isAddToCardActive}>
          Quantity: {quantityMessage}
        </Text>
        <Button
          isActive={isAddToCardActive}
          type="button"
          disabled={!isAddToCardActive}
          onClick={onProductClick}
        >
          <FaCartPlus />
          Add to cart
        </Button>
      </ProductWrapper>
    );
  }
}

export default Product;
