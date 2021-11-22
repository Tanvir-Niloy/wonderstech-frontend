import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

const Sidebar = ({ onCloseSidebar, sidebar }) => {
  return (
    <>
      <div onClick={onCloseSidebar} className="sidebar__overlay" />
      <div className={classNames("sidebar_wrapper", { active: sidebar })}>
        <div className="sidebar">
          <div className="sidebar__body">
            <h4 className="sidebar__body-info">
              <span>Login:Admin</span>
              <span onClick={onCloseSidebar} className="sidebar__close-btn">
                &times;
              </span>
            </h4>

            <div className="sidebar__menu">
              <ul>
                <li>
                  <Link to="/admin/dashboard">
                    <i className="fa fa-tachometer"></i>
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/product">
                    <i className="fa fa-product-hunt" aria-hidden="true"></i>
                    <span>Product</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/users">
                    <i className="fa fa-users" aria-hidden="true"></i>
                    <span>Users</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/orders">
                    <i className="fa fa-rss" aria-hidden="true"></i>
                    <span>Orders</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="sidebar__footer">Certified user</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
