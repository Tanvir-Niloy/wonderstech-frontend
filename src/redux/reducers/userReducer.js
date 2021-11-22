import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
  USER_PROFILE_RESET,
  SAVE_USER_SHIPPING_ADDRESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_EDIT_RESET,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAIL,
  USER_DELETE_RESET,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };

    case USER_LOGIN_FAIL:
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

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };

    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };

    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_REGISTER_RESET:
      return {};

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const getUserDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case USER_LOGOUT:
      return { user: {} };

    default:
      return state;
  }
};

export const updateUserProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATE_REQUEST:
      return {
        loading: true,
      };

    case USER_PROFILE_UPDATE_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        success: true,
      };

    case USER_PROFILE_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_PROFILE_RESET:
      return {};

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        loading: true,
      };

    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };

    case USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_LOGOUT:
      return { users: [] };

    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        loading: true,
      };

    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        status: action.payload,
        success: true,
      };

    case USER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

export const userEditReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EDIT_REQUEST:
      return {
        loading: true,
      };

    case USER_EDIT_SUCCESS:
      return {
        loading: false,
        status: action.payload,
        success: true,
      };

    case USER_EDIT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_EDIT_RESET:
      return {};

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const saveShippingAddressReducer = (
  state = { shippingAddress: {} },
  action
) => {
  if (action.type === SAVE_USER_SHIPPING_ADDRESS) {
    return {
      shippingAddress: action.payload,
    };
  }

  if (action.type === USER_LOGOUT) {
    return { shippingAddress: {} };
  }

  return state;
};
