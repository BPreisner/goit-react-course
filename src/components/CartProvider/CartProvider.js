import { useContext, createContext, useReducer } from 'react';

const CartContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_TO_CART': {
      const { productInfo } = action;

      if (state.itemsById[productInfo.id]) {
        return {
          ...state,
          itemsById: {
            ...state.itemsById,
            [productInfo.id]: {
              ...state.itemsById[productInfo.id],
              count: state.itemsById[productInfo.id].count + 1,
            },
          },
        };
      }

      return {
        itemsList: [...state.itemsList, productInfo.id],
        itemsById: {
          ...state.itemsById,
          [productInfo.id]: {
            ...productInfo,
            count: 1,
          },
        },
      };
    }

    case 'REMOVE_PRODUCT_FROM_CART': {
      const { productId } = action;

      const newItemsById = {
        ...state.itemsById,
      };

      const {
        [productId]: _removedProduct,
        ...itemsByIdWithoutRemovedProduct
      } = newItemsById;

      return {
        itemsList: state.itemsList.filter((id) => id !== productId),
        itemsById: itemsByIdWithoutRemovedProduct,
      };
    }

    default:
      throw new Error();
  }
};

export const CartContextProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(reducer, {
    itemsById: {},
    itemsList: [],
  });

  return (
    <CartContext.Provider
      value={{
        cartState,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
