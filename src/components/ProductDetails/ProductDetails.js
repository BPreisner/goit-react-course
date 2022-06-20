import { FaCartPlus } from 'react-icons/fa';
import { useEffect } from 'react';
import { Loader } from 'rsuite';
import { useParams, Outlet } from 'react-router-dom';
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
import { useCartContext } from '../CartProvider/CartProvider';

const ProductDetails = () => {
  const [{ data: product, isLoading }, getProduct] = useApi(getProductById);
  const { dispatch } = useCartContext();
  const params = useParams();
  const productId = params.productId;

  const { image, title, description, price } = product;

  useEffect(() => {
    getProduct(productId);
  }, [getProduct, productId]);

  const handleAddProductToBasket = () => {
    dispatch({
      type: 'ADD_PRODUCT_TO_CART',
      productInfo: { title, id: productId, price },
    });
  };

  return (
    <ProductPanel>
      {isLoading ? (
        <Loader backdrop content="loading..." vertical />
      ) : (
        <ProductWrapper>
          <ProductImage src={image} alt={title} />
          <Outlet />
          <ProductInfo>
            <h3>{title}</h3>
            <Text>{description}</Text>
            <Price>{price} $</Price>
            <StyledButton
              color="green"
              appearance="primary"
              type="button"
              onClick={handleAddProductToBasket}
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
