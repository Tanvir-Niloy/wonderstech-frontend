import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/actions/userActions";

const MobileNavMenu = ({ strings }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    console.log("logout");
    dispatch(logout());
  };

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/"}>{strings["home"]}</Link>
        </li>

        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/shop"}>
            {strings["shop"]}
          </Link>
        
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/shop"}>
            {strings["collection"]}
          </Link>
        </li>
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/"}>{strings["pages"]}</Link>
          <ul className="sub-menu">
            <li>
              <Link to={process.env.PUBLIC_URL + "/cart"}>
                {strings["cart"]}
              </Link>
            </li>
            {userInfo && (
              <li>
                <Link to={process.env.PUBLIC_URL + "/checkout"}>
                  {strings["checkout"]}
                </Link>
              </li>
            )}
            <li>
              <Link to={process.env.PUBLIC_URL + "/wishlist"}>
                {strings["wishlist"]}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/compare"}>
                {strings["compare"]}
              </Link>
            </li>

            <li>
              <Link to={process.env.PUBLIC_URL + "/about"}>
                {strings["about_us"]}
              </Link>
            </li>
            {/* <li>
              <Link to={process.env.PUBLIC_URL + "/not-found"}>
                {strings["404_page"]}
              </Link>
            </li> */}
          </ul>
        </li>
        {userInfo && userInfo.isAdmin && (
          <li>
            <Link to={process.env.PUBLIC_URL + "/admin/dashboard"}>
              {strings["admin"]}
            </Link>
          </li>
        )}
        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            {strings["contact_us"]}
          </Link>
        </li>

        {userInfo ? (
          <>
            <li>
              <Link to={process.env.PUBLIC_URL + "/my-account"}>
                {strings["my_account"]}
              </Link>
            </li>

            <li onClick={logoutHandler}>
              <Link to="/">{strings["logout"]}</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login"}>
                {strings["login"]}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/register"}>
                {strings["register"]}
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object,
};

export default multilanguage(MobileNavMenu);
