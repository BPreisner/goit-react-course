import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { Loader, Message, Panel } from 'rsuite';
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
import { getProducts } from '../../api/requests';
import { useAuthneticationContext } from '../AuthenticationProvider/AuthenticationProvider';
import { useApi } from '../../hooks/useApi';

const validateSortingQuery = (sortingValue) => {
  if (['asc', 'desc'].includes(sortingValue)) {
    return sortingValue;
  } else {
    return 'asc';
  }
};

const ProductsList = () => {
  const authneticationContext = useAuthneticationContext();
  const [cart, setCart] = useState({
    itemsById: {},
    itemsList: [],
  });
  let [searchParams, setSearchParams] = useSearchParams();
  const [sortDirection, setSortDirection] = useState(
    validateSortingQuery(searchParams.get('sort')),
  );

  const [{ data: productItems, isLoading, isError }, fetch] =
    useApi(getProducts);

  useEffect(() => {
    fetch({
      sortDirection: sortDirection,
    });
  }, [fetch, sortDirection]);

  const handleAddProductToBasket = (productInfo) => (event) => {
    event.preventDefault();

    setCart((prevState) => {
      if (prevState.itemsById[productInfo.id]) {
        return {
          ...prevState,
          itemsById: {
            ...prevState.itemsById,
            [productInfo.id]: {
              ...prevState.itemsById[productInfo.id],
              count: prevState.itemsById[productInfo.id].count + 1,
            },
          },
        };
      }

      return {
        itemsList: [...prevState.itemsList, productInfo.id],
        itemsById: {
          ...prevState.itemsById,
          [productInfo.id]: {
            ...productInfo,
            count: 1,
          },
        },
      };
    });
  };

  const handleRemoveProductFromBasket = (productId) => (event) => {
    setCart((prevState) => {
      const newItemsById = {
        ...prevState.itemsById,
      };

      const {
        [productId]: _removedProduct,
        ...itemsByIdWithoutRemovedProduct
      } = newItemsById;

      return {
        itemsList: prevState.itemsList.filter((id) => id !== productId),
        itemsById: itemsByIdWithoutRemovedProduct,
      };
    });
  };

  const handleSortChange = () => {
    setSortDirection((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    setSearchParams({ sort: sortDirection });
  }, [setSearchParams, sortDirection]);

  return (
    authneticationContext.isUserAuthenticated && (
      <Layout>
        <Panel shaded>
          <NavBarContent>
            <Cart
              cartItemsList={cart.itemsList}
              cartItemsById={cart.itemsById}
              onRemoveProductFromCart={handleRemoveProductFromBasket}
            />
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
            {productItems.length > 0
              ? productItems.map((product) => {
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
    )
  );
};

export default ProductsList;
