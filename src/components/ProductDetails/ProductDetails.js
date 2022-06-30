import { FaCartPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Loader, Message } from 'rsuite';
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
import { addProductsToCart } from '../../store/Cart/actions';
import { getProductById } from '../../store/Products/actions';
import {
  selectProductById,
  selectProductStatusByProductId,
} from '../../store/Products/selectors';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.productId;
  const product = useSelector((state) => selectProductById(state, productId));
  const productStatus = useSelector((state) =>
    selectProductStatusByProductId(state, productId),
  );

  useEffect(() => {
    dispatch(getProductById({ productId }));
  }, [dispatch, productId]);

  if (product) {
    const { image, title, description, price } = product;

    const handleAddProductToBasket = () => {
      dispatch(
        addProductsToCart({ productInfo: { title, id: productId, price } }),
      );
    };

    return (
      <ProductPanel>
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
      </ProductPanel>
    );
  }

  if (productStatus === 'error') {
    return <Message type="error">Error</Message>;
  }

  return <Loader backdrop content="loading..." vertical />;
};

export default ProductDetails;
