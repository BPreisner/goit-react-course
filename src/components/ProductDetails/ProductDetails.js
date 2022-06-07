import { FaCartPlus } from 'react-icons/fa';
import { useEffect } from 'react';
import { Loader } from 'rsuite';
import { useParams } from 'react-router-dom';
import {
  ProductWrapper,
  StyledButton,
  Price,
  Text,
  ProductImage,
  ProductInfo,
  ProductPanel,
} from './ProductDetails.styles';
import { getProductById } from '../../api/requests';
import { useApi } from '../../hooks/useApi';

const ProductDetails = () => {
  const [{ data: product, isLoading }, getProduct] = useApi(getProductById);
  const params = useParams();
  const productId = params.productId;

  const { image, title, description, amount, currency, isAddToCardActive } =
    product;

  useEffect(() => {
    getProduct(productId);
  }, [getProduct, productId]);

  return (
    <ProductPanel>
      {isLoading ? (
        <Loader backdrop content="loading..." vertical />
      ) : (
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
              // onClick={onProductClick}
            >
              <FaCartPlus />
              Add to cart
            </StyledButton>
          </ProductInfo>
        </ProductWrapper>
      )}
    </ProductPanel>
  );
};

export default ProductDetails;
