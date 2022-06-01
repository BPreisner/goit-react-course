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

const ProductsList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({
    items: [],
    isError: false,
    isLoading: false,
    sortDirection: 'asc',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setProducts((prevState) => ({
        ...prevState,
        isError: false,
        isLoading: true,
      }));

      try {
        const data = await getProducts({
          sortDirection: products.sortDirection,
        });

        setProducts((prevState) => ({
          ...prevState,
          items: data,
        }));
      } catch (error) {
        setProducts((prevState) => ({
          ...prevState,
          isError: true,
        }));
      } finally {
        setProducts((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      }
    };

    fetchProducts();
  }, [products.sortDirection]);

  const handleAddProductToBasket = (productInfo) => (event) => {
    setCartItems((prevState) => [...prevState.cartItems, productInfo]);
  };

  const handleSortChange = () => {
    setProducts((prevState) => ({
      ...prevState,
      sortDirection: prevState.sortDirection === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
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
            {products.sortDirection === 'asc' ? <FaArrowDown /> : <FaArrowUp />}
          </StyledButton>
        </NavBarContent>
      </Panel>

      {products.isError && <Message type="error">Error</Message>}

      {products.isLoading ? (
        <Loader backdrop content="loading..." vertical />
      ) : (
        <StyledProductsList>
          {products.items.length > 0
            ? products.items.map((product) => {
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
            : !products.isError && <h2>No products</h2>}
        </StyledProductsList>
      )}
    </Layout>
  );
};

export default ProductsList;
