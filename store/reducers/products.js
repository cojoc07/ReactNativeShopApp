import PRODUCTS from "../../data/dummy-data";
import {
  SET_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../actions/products";
import Product from "../../models/product";

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS: {
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.userProducts,
      };
    }

    case CREATE_PRODUCT: {
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.createDate,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    }

    case UPDATE_PRODUCT: {
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );

      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.createDate,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.pid
      );

      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
    }

    case DELETE_PRODUCT: {
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (item) => item.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (item) => item.id !== action.pid
        ),
      };
    }
  }
  return state;
};
