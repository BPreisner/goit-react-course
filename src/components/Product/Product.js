import PropTypes from 'prop-types';
import { FaCartPlus } from 'react-icons/fa';
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

const Product = ({
  image = productImageNotAvailableUrl,
  title,
  price,
  description,
  onProductClick,
}) => {
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
};

Product.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  onProductClick: PropTypes.func.isRequired,
};

export default Product;
