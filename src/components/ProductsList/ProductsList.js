import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { Loader, Message, Panel } from 'rsuite';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import {
  Layout,
  StyledProductsList,
  NavBarContent,
  StyledButton,
} from './ProductsList.styles';
import Cart from '../Cart/Cart';
import {
  addProductsToCart,
  removeProductFromCart,
} from '../../store/Cart/actions';

import { getProducts } from '../../store/Products/actions';
import {
  selectSortedProducts,
  selectProductsStatus,
} from '../../store/Products/selectors';

const validateSortingQuery = (sortingValue) => {
  if (['asc', 'desc'].includes(sortingValue)) {
    return sortingValue;
  } else {
    return 'asc';
  }
};

const ProductsList = () => {
  const sortedProducts = useSelector(selectSortedProducts);
  const productsStatus = useSelector(selectProductsStatus);

  const dispatch = useDispatch();

  let [searchParams, setSearchParams] = useSearchParams();
  const [sortDirection, setSortDirection] = useState(
    validateSortingQuery(searchParams.get('sort')),
  );

  useEffect(() => {
    dispatch(
      getProducts({
        sortDirection: sortDirection,
      }),
    );
  }, [dispatch, sortDirection]);

  const handleAddProductToBasket = (productInfo) => (event) => {
    event.preventDefault();

    dispatch(addProductsToCart({ productInfo: productInfo }));
  };

  const handleRemoveProductFromBasket = (productId) => (event) => {
    dispatch(removeProductFromCart({ productId: productId }));
  };

  const handleSortChange = () => {
    setSortDirection((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    setSearchParams({ sort: sortDirection });
  }, [setSearchParams, sortDirection]);

  const isError = productsStatus === 'error';
  const isLoading =
    (productsStatus === 'fetching' && !sortedProducts.length) ||
    productsStatus === 'idle';

  return (
    <Layout>
      <Panel shaded>
        <NavBarContent>
          <Cart onRemoveProductFromCart={handleRemoveProductFromBasket} />
        </NavBarContent>
      </Panel>

      <Panel shaded>
        <NavBarContent as="div">
          <h4>Filters:</h4>

          <StyledButton onClick={handleSortChange}>
            Sorting:
            {sortDirection === 'asc' ? <FaArrowDown /> : <FaArrowUp />}
          </StyledButton>
        </NavBarContent>
      </Panel>

      {isError && <Message type="error">Error</Message>}

      {isLoading ? (
        <Loader backdrop content="loading..." vertical />
      ) : (
        <StyledProductsList>
          {sortedProducts.length > 0
            ? sortedProducts.map((product) => {
                const { id, title, price, image, description } = product;

                return (
                  <ProductCard
                    key={id}
                    productId={id}
                    title={title}
                    price={price}
                    description={description}
                    image={image}
                    onProductClick={handleAddProductToBasket({
                      title,
                      id,
                      price,
                    })}
                  />
                );
              })
            : !isError && <h2>No products</h2>}
        </StyledProductsList>
      )}
    </Layout>
  );
};

export default ProductsList;
