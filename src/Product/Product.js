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

const Product = ({
  imgUrl = productImageNotAvailableUrl,
  name,
  price,
  quantity,
}) => {
  const quantityMessage = getProductQuantityMessage(quantity);
  const amount = `${price ? price : 'Priceless :)'}`;
  const currency = !!price && '$';
  const isAddToCardActive = quantity > 0;

  const handleClick = (event) => {
    console.log(event);
  };

  return (
    <ProductWrapper>
      <ProductImage src={imgUrl} alt={name} />
      <h1>{name}</h1>
      <Price>
        Price: {amount}
        {currency}
      </Price>
      <Text isOutOfStock={!isAddToCardActive}>Quantity: {quantityMessage}</Text>
      <Button
        isActive={isAddToCardActive}
        type="button"
        disabled={!isAddToCardActive}
        onClick={handleClick}
      >
        <FaCartPlus />
        Add to cart
      </Button>
    </ProductWrapper>
  );
};

Product.propTypes = {
  name: PropTypes.string.isRequired, // podpowiedzi: ctrl + spacja
  price: PropTypes.number.isRequired, // alt + shift + strzalka w dol
  quantity: PropTypes.number.isRequired,
  imgUrl: PropTypes.string,
};

export default Product;
