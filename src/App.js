import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";

// Admin Pages

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminUsers from "./pages/admin/AdminUsers";
import Order from "./pages/other/Order";
import Loader from "./components/Loader/Loader";
import Login from "./pages/other/Login";
import Register from "./pages/other/Register";
import ActivateAccount from "./pages/other/ActivateAccount";
import AdminEditUser from "./pages/admin/AdminEditUser";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminOrders from "./pages/admin/AdminOrderList";
import AdminEditProduct from "./pages/admin/AdminEditProduct";


// home pages
const HomeScreen = lazy(() => import("./pages/home/HomeScreen"));

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));
const ShopGridFilter = lazy(() => import("./pages/shop/ShopGridFilter"));


// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));
const ProductTabLeft = lazy(() =>
  import("./pages/shop-product/ProductTabLeft")
);
const ProductTabRight = lazy(() =>
  import("./pages/shop-product/ProductTabRight")
);
const ProductSticky = lazy(() => import("./pages/shop-product/ProductSticky"));
const ProductSlider = lazy(() => import("./pages/shop-product/ProductSlider"));
const ProductFixedImage = lazy(() =>
  import("./pages/shop-product/ProductFixedImage")
);

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
// const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = (props) => {
  // const dispatch = useDispatch();
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
         
        },
      })
    );
  });



  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <Loader />
              }
            >
              <Switch>
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={HomeScreen}
                />
                {/* Shop pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/shop"}
                  component={ShopGridStandard}                
                />
                 <Route
                  path={process.env.PUBLIC_URL + "/search/:keyword"}
                  component={ShopGridStandard}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-filter"}
                  component={ShopGridFilter}
                />
             

                {/* Shop product pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/product/:id"}
                  render={(routeProps) => (
                    <Product {...routeProps} key={routeProps.match.params.id} />
                  )}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-tab-left/:id"}
                  component={ProductTabLeft}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-tab-right/:id"}
                  component={ProductTabRight}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-sticky/:id"}
                  component={ProductSticky}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-slider/:id"}
                  component={ProductSlider}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-fixed-image/:id"}
                  component={ProductFixedImage}
                />

                {/* Other pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/about"}
                  component={About}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/contact"}
                  component={Contact}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccount}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/login"}
                  component={Login}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/register"}
                  component={Register}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/users/activate/:token"}
                  component={ActivateAccount}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/cart"}
                  component={Cart}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={Wishlist}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/compare"}
                  component={Compare}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/order/:id"}
                  component={Order}
                />

                {/* ADMIN PAGES  */}

                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/admin/dashboard"}
                  component={AdminDashboard}
                />

                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/admin/product"}
                  component={AdminProduct}
                />

                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/admin/users"}
                  component={AdminUsers}
                />

                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/admin/blog"}
                  component={AdminBlog}
                />

                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/admin/edit/:id"}
                  component={AdminEditUser}
                />

                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/admin/add-product"}
                  component={AdminAddProduct}
                />

                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/admin/edit-product/:id"}
                  component={AdminEditProduct}
                />

                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/admin/orders"}
                  component={AdminOrders}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/not-found"}
                  component={NotFound}
                />

                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(multilanguage(App));
