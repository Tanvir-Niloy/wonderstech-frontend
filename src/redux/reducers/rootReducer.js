import currencyReducer from "./currencyReducer";

import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";
import {
  getUserDetailsReducer,
  saveShippingAddressReducer,
  updateUserProfileReducer,
  userDeleteReducer,
  userEditReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer
} from "./userReducer";
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
} from "./orderReducers";

import {
  productReducer,
  productDeleteReducer,
  productCreateReducer,
  productByIdReducer,
  productUpdateReducer
} from "./productReducer";

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  currencyData: currencyReducer,
  productData: productReducer,
  productCreate: productCreateReducer,
  productById: productByIdReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: getUserDetailsReducer,
  userUpdateProfile: updateUserProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userEdit: userEditReducer,
  userShippingAddress: saveShippingAddressReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderMyList: orderListMyReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
});

export default rootReducer;
