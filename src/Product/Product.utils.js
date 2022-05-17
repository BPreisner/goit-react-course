export const productImageNotAvailableUrl =
  'https://crossfitbbros.com/bbros-1/wp-content/uploads/2021/01/no-photo-available.png';

export const getProductQuantityMessage = (quantity) => {
  if (quantity === 0) {
    return 'Out of stock';
  } else if (quantity < 20) {
    return 'Few left';
  } else {
    return 'In stock';
  }
};
