import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_LOADING,
  FETCH_PRODUCTS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_BY_ID_REQUEST,
  PRODUCT_BY_ID_SUCCESS,
  PRODUCT_BY_ID_FAIL,
  PRODUCT_BY_ID_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  
} from "../constants/productConstants";
import { USER_LOGOUT } from "../constants/userConstants";

const initState = {
  products: [],
};

export const productReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_LOADING:
      return {
        loading: true,
        products: [],
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case FETCH_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case PRODUCT_CREATE_RESET:
      return {};

    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const productByIdReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_BY_ID_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case PRODUCT_BY_ID_RESET:
      return {};

    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};



export const productUpdateReducer = (state = {product:{}}, action) => {
    
  switch (action.type) {
       
      case PRODUCT_UPDATE_REQUEST:
          return { loading: true ,...state}
       case PRODUCT_UPDATE_SUCCESS:
          return { loading: false,success:true,product:action.payload }
          case PRODUCT_UPDATE_FAIL:
          return { loading: false, error: action.payload }
          case PRODUCT_UPDATE_RESET:
              return {product:{}}
      default:
          return state;   
   }
}