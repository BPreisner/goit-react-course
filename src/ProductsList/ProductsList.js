import { Component } from 'react';
import Product from '../Product/Product';
import { StyledProductsList } from './ProductsList.styles';
import Cart from '../Cart/Cart';

class ProductsList extends Component {
  constructor() {
    super();

    this.state = {
      cartItems: [],
      isCartDialogOpen: false,
    };
  }

  handleClick = (productInfo) => (event) => {
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, productInfo],
    }));
  };

  handleOpenCartDialog = () => {
    this.setState({
      isCartDialogOpen: true,
    });
  };

  handleCloseCartDialog = () => {
    this.setState({
      isCartDialogOpen: false,
    });
  };

  render() {
    const { children, products } = this.props;

    return (
      <>
        <button onClick={this.handleOpenCartDialog}>Open basket</button>

        {this.state.isCartDialogOpen && (
          <Cart
            cartItems={this.state.cartItems}
            onCartClose={this.handleCloseCartDialog}
          />
        )}

        <StyledProductsList>
          {products.map((product) => {
            const { id, name, price, quantity, imgUrl } = product;

            return (
              <Product
                key={id}
                name={name}
                price={price}
                quantity={quantity}
                imgUrl={imgUrl}
                onProductClick={this.handleClick({ name, id, price })}
              />
            );
          })}
          {children}
        </StyledProductsList>
      </>
    );
  }
}

export default ProductsList;
