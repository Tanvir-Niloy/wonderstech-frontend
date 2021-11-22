import React from "react";
import { Link } from "react-router-dom";

const HeaderNav = ({ onSidebarHandler }) => {
  return (
    <div className="admin__header-nav">
      <div className="admin__header-logo">
        {/* <img src="" alt="baby product logo" /> */}
        <h4>Wonders Smart Tech (Admin Panel)</h4>
      </div>
      <ul>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/product">Product</Link>
        </li>
        <li>
          <Link to="/admin/users">Users</Link>
        </li>
        <li>
          <Link to="/admin/orders">Orders</Link>
        </li>
      </ul>
      <div onClick={onSidebarHandler} className="admin__header-nav-hamburger">
        <i className="fa fa-bars"></i>
      </div>
    </div>
  );
};

export default HeaderNav;
