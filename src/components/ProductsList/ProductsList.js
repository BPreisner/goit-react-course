import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { Loader, Message, Panel } from 'rsuite';
import { Component } from 'react';
import Product from '../Product/Product';
import {
  Layout,
  StyledProductsList,
  NavBarContent,
  StyledButton,
} from './ProductsList.styles';
import Cart from '../Cart/Cart';
import { getProducts } from '../../api/requests';

class ProductsList extends Component {
  constructor() {
    super();

    this.state = {
      products: {
        items: [],
        isError: false,
        isLoading: false,
        sortDirection: 'asc',
      },
      cartItems: [],
    };
  }

  handleAddProductToBasket = (productInfo) => (event) => {
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, productInfo],
    }));
  };

  handleSortChange = () => {
    this.setState((prevState) => ({
      products: {
        ...prevState.products,
        sortDirection:
          prevState.products.sortDirection === 'asc' ? 'desc' : 'asc',
      },
    }));
  };

  async componentDidMount() {
    try {
      this.setState((prevState) => ({
        products: {
          ...prevState.products,
          isLoading: true,
        },
      }));

      const data = await getProducts({
        sortDirection: this.state.products.sortDirection,
      });

      this.setState((prevState) => ({
        products: {
          ...prevState.products,
          items: data,
        },
      }));
    } catch (error) {
      this.setState((prevState) => ({
        products: {
          ...prevState.products,
          isError: true,
        },
      }));
    } finally {
      this.setState((prevState) => ({
        products: {
          ...prevState.products,
          isLoading: false,
        },
      }));
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.products.sortDirection !== this.state.products.sortDirection
    ) {
      try {
        this.setState((prevState) => ({
          products: {
            ...prevState.products,
            isLoading: true,
            isError: false,
          },
        }));

        const data = await getProducts({
          sortDirection: this.state.products.sortDirection,
        });

        this.setState((prevState) => ({
          products: {
            ...prevState.products,
            items: data,
          },
        }));
      } catch (error) {
        this.setState((prevState) => ({
          products: {
            ...prevState.products,
            isError: true,
          },
        }));
      } finally {
        this.setState((prevState) => ({
          products: {
            ...prevState.products,
            isLoading: false,
          },
        }));
      }
    }
  }

  render() {
    return (
      <Layout>
        <Panel shaded>
          <NavBarContent>
            <Cart cartItems={this.state.cartItems} />
          </NavBarContent>
        </Panel>

        <Panel shaded>
          <NavBarContent as="div">
            <h4>Filters:</h4>

            <StyledButton onClick={this.handleSortChange}>
              Sorting:
              {this.state.products.sortDirection === 'asc' ? (
                <FaArrowDown />
              ) : (
                <FaArrowUp />
              )}
            </StyledButton>
          </NavBarContent>
        </Panel>

        {this.state.products.isError && <Message type="error">Error</Message>}

        {this.state.products.isLoading ? (
          <Loader backdrop content="loading..." vertical />
        ) : (
          <StyledProductsList>
            {this.state.products.items.length > 0
              ? this.state.products.items.map((product) => {
                  const { id, title, price, image, description } = product;

                  return (
                    <Product
                      key={id}
                      title={title}
                      price={price}
                      description={description}
                      image={image}
                      onProductClick={this.handleAddProductToBasket({
                        title,
                        id,
                        price,
                      })}
                    />
                  );
                })
              : !this.state.products.isError && <h2>No products</h2>}
          </StyledProductsList>
        )}
      </Layout>
    );
  }
}

export default ProductsList;
