import { Component } from 'react';
import Product from '../Product/Product';
import { StyledProductsList } from './ProductsList.styles';

class ProductsListAsClass extends Component {
  constructor() {
    super();

    this.state = {
      cartItems: [],
      isCartDialogOpen: false,
    };
  }

  handleClick = (productName) => (event) => {
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, productName],
    }));
  };

  // handleToggleCardDialog = () => {
  //   this.setState((prevState) => ({
  //     isCartDialogOpen: !prevState.isCartDialogOpen,
  //   }));
  // };

  handleOpenCartDialog = () => {
    this.setState(
      {
        isCartDialogOpen: true,
      },
      () => {
        console.log(this.state.isCartDialogOpen);
      },
    );

    console.log(this.state.isCartDialogOpen);
  };

  handleCloseCartDialog = () => {
    this.setState({
      isCartDialogOpen: false,
    });
  };

  render() {
    const { children, products } = this.props;

    console.log(this.state);

    return (
      <>
        <button onClick={this.handleOpenCartDialog}>Open basket</button>
        <dialog open={this.state.isCartDialogOpen}>
          <button onClick={this.handleCloseCartDialog}>Close</button>

          <ul>
            {this.state.cartItems.length > 0
              ? this.state.cartItems.map((item) => <li>{item}</li>)
              : 'Empty Cart'}
          </ul>
        </dialog>

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
      </>
    );
  }
}

// const ProductsList = ({ products, children }) => (
//   <StyledProductsList>
//     {products.map((product) => {
//       const { id, name, price, quantity, imgUrl } = product;

//       return (
//         <Product
//           key={id}
//           name={name}
//           price={price}
//           quantity={quantity}
//           imgUrl={imgUrl}
//         />
//       );
//     })}
//     {children}
//   </StyledProductsList>
// );

export default ProductsListAsClass;
