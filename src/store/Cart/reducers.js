import { ActionTypes, initialState } from './constants';

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AddProductsToCart: {
      const {
        payload: { productInfo },
      } = action;

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

    case ActionTypes.RemoveProductFromCart: {
      const {
        payload: { productId },
      } = action;

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
      return state;
  }
};
