import React, { useEffect } from "react";
import LayoutAdmin from "../../layouts/LayoutAdmin";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminDashboard = ({ history }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    }
  }, [userInfo, history]);

  return (
    <LayoutAdmin>
      <div className="container">
        <h1 className="py-3">Welcome to your Dashboard</h1>
        <div className="row">
          <div className="col-md-3">
            <div className="card bg-info text-center p-4">
              <h3>Modify Users List</h3>
              <Link to="/admin/users">
                <button className="btn btn-light">users</button>
              </Link>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-warning text-center p-4 text-white">
              <h3>Modify Products</h3>
              <Link to="/admin/product">
                <button className="btn btn-light">product</button>
              </Link>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-danger text-center p-4">
              <h3>Go To All Orders</h3>
              <Link to="/admin/orders">
                <button className="btn btn-light">Orders</button>
              </Link>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card  bg-light text-center p-4">
              <h3>Go To HomePage</h3>
              <Link to="/">
                <button className="btn btn-dark">Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default AdminDashboard;
