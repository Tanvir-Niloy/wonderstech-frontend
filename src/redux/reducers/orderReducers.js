import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import { USER_LOGOUT } from "../constants/userConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        order: action.payload,
        success: true,
      };

    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_CREATE_RESET:
      return {
        ...state,
        success: false,
      };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, order: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
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

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case ORDER_LIST_MY_FAIL:
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

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_LOGOUT:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_DELIVER_RESET:
      return {};

    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
