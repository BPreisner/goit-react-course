import { FaCartPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
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
import { addProductsToCart } from '../../store/Cart/actions';

const ProductDetails = () => {
  const [{ data: product, isLoading }, getProduct] = useApi(getProductById);
  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.productId;

  const { image, title, description, price } = product;

  useEffect(() => {
    getProduct(productId);
  }, [getProduct, productId]);

  const handleAddProductToBasket = () => {
    dispatch(addProductsToCart({ title, id: productId, price }));
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
