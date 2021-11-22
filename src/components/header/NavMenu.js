import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";

const NavMenu = ({ strings, menuWhiteClass, sidebarMenu }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      } `}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              {strings["home"]}
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/shop"}>
              {" "}
              {strings["shop"]}
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/shop-grid-filter"}>
              {strings["collection"]}
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              {strings["pages"]}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
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
              {userInfo ? (
                <li>
                  <Link to={process.env.PUBLIC_URL + "/my-account"}>
                    {strings["my_account"]}
                  </Link>
                </li>
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
              <li>
                <Link to={process.env.PUBLIC_URL + "/about"}>
                  {strings["about_us"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/contact"}>
                  {strings["contact_us"]}
                </Link>
              </li>
            </ul>
          </li>
             <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>
              {strings["contact_us"]}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object,
};

export default multilanguage(NavMenu);
