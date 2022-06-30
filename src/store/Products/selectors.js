import { createSelector } from '@reduxjs/toolkit';

export const selectProductById = createSelector(
  (state) => state.products.entities,
  (_state, productId) => productId,
  (entities, productId) => entities[productId]?.entity,
);

// Not createSelector because it returns primitive value
export const selectProductStatusByProductId = (state, productId) =>
  state.products.entities[productId]?.status;

export const selectSortedProducts = createSelector(
  (state) => state.products.entitiesList,
  (state) => state.products.entities,
  (entitiesList, entities) => {
    return entitiesList.map((productId) => entities[productId].entity);
  },
);

// Not createSelector because it returns primitive value
export const selectProductsStatus = (state) => state.products.status;
