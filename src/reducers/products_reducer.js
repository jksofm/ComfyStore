import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
    case GET_PRODUCTS_BEGIN:
      return { ...state, productsLoading: true,isLoading : true };
    case GET_PRODUCTS_SUCCESS:
      const featuredProducts = action.payload.filter((product) => {
        return product.featured === true;
      });
      return {
        ...state,
        products: action.payload,
        featuredProducts,
        productsLoading: false,
        isLoading : false
      };
    case GET_PRODUCTS_ERROR:
      return { ...state, productsLoading: false, productsError: true };
    case GET_SINGLE_PRODUCT_BEGIN:
      return {
        ...state,
        singleProductLoading: true,
        singleProductError: false,
      };
    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        singleProductLoading: false,
        singleProduct: action.payload,
      };
    case GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        singleProductLoading: false,
        singleProductError: true,
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default products_reducer;
