import PropTypes from 'prop-types';
import { FaCartPlus } from 'react-icons/fa';
import { Component } from 'react';
import { productImageNotAvailableUrl } from './Product.utils';
import {
  ProductWrapper,
  StyledButton,
  Price,
  Text,
  ProductImage,
  ProductInfo,
  ProductCard,
} from './Product.styles';

class Product extends Component {
  static defaultProps = {
    image: productImageNotAvailableUrl,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    onProductClick: PropTypes.func.isRequired,
  };

  render() {
    const { image, title, price, description, onProductClick } = this.props;

    const amount = `${price ? price : 'Priceless :)'}`;
    const currency = !!price && '$';
    const isAddToCardActive = price > 0;

    return (
      <ProductCard shaded>
        <ProductWrapper>
          <ProductImage src={image} alt={title} />
          <ProductInfo>
            <h3>{title}</h3>
            <Text>{description}</Text>
            <Price>
              {amount} {currency}
            </Price>
            <StyledButton
              color="green"
              appearance="primary"
              disabled={!isAddToCardActive}
              type="button"
              onClick={onProductClick}
            >
              <FaCartPlus />
              Add to cart
            </StyledButton>
          </ProductInfo>
        </ProductWrapper>
      </ProductCard>
    );
  }
}

export default Product;
