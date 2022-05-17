import { Component } from 'react';
import Product from '../Product/Product';
import { StyledProductsList } from './ProductsList.styles';

class ProductsListAsClass extends Component {
  constructor() {
    super();

    this.state = {
      cartItems: [],
      counter: 1,
    };
  }

  handleClick = (productName) => (event) => {
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, productName],
    }));
  };

  render() {
    const { children, products } = this.props;

    console.log(this.state);

    return (
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
              onProductClick={this.handleClick}
            />
          );
        })}
        {children}
      </StyledProductsList>
    );
  }
}

const ProductsList = ({ products, children }) => (
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
        />
      );
    })}
    {children}
  </StyledProductsList>
);

export default ProductsListAsClass;
