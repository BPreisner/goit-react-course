import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { Loader, Message, Panel } from 'rsuite';
import { useState, useEffect } from 'react';
import Product from '../Product/Product';
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

const ProductsList = (props) => {
  const authneticationContext = useAuthneticationContext();
  const [cartItems, setCartItems] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');

  const [{ data: productItems, isLoading, isError }, fetch] =
    useApi(getProducts);

  useEffect(() => {
    fetch({
      sortDirection: sortDirection,
    });
  }, [fetch, sortDirection]);

  const handleAddProductToBasket = (productInfo) => (event) => {
    setCartItems((prevState) => [...prevState, productInfo]);
  };

  const handleSortChange = () => {
    setSortDirection((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  };

  return (
    authneticationContext.isUserAuthenticated && (
      <Layout>
        <Panel shaded>
          <NavBarContent>
            <Cart cartItems={cartItems} />
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
                    <Product
                      key={id}
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
