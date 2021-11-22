import React, { useEffect } from "react";
import OrdersList from "../../components/admin/OrderList";
import LayoutAdmin from "../../layouts/LayoutAdmin";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList } from "../../redux/actions/orderActions";
import Loader from "../../components/Loader/Loader";
import Alert from "../../components/alert/Alert";

const AdminOrders = ({ history }) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, error, orders } = useSelector((state) => state.orderList);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getOrderList());
    } else {
      history.push("/");
    }
  }, [dispatch, userInfo, history]);

  return (
    <>
      <LayoutAdmin>
        <div className="container-lg">
          <div className="d-flex justify-content-between my-2">
            <h1>Orders List</h1>
          </div>
          <Link to="/admin/dashboard">
            <button className="btn btn-light"> &larr; Back</button>
          </Link>
          {loading ? (
            <Loader />
          ) : error ? (
            <Alert> {error} </Alert>
          ) : (
            <OrdersList orders={orders} />
          )}
        </div>
      </LayoutAdmin>
    </>
  );
};

export default AdminOrders;
