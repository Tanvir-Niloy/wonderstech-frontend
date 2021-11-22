import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { deleteFromCart } from "../../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions";

const IconGroup = ({
  currency,
  cartData,
  wishlistData,
  compareData,
  deleteFromCart,
  iconWhiteClass,
}) => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  const { userInfo } = useSelector((state) => state.userLogin);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
      {/* <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div> */}
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={(e) => handleClick(e)}
        >
          <i className="pe-7s-user" />
        </button>
        <div className="account-dropdown">
          <ul>
            {userInfo ? (
              <>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/my-account"}>
                    My Account
                  </Link>
                </li>
                {userInfo && userInfo.isAdmin && (
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/admin/dashboard"}>
                      Admin
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/" onClick={logoutHandler}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/login"}>Login</Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/register"}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {compareData && compareData.length ? compareData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistData && wishlistData.length ? wishlistData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart
          cartData={cartData}
          currency={currency}
          deleteFromCart={deleteFromCart}
        />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
