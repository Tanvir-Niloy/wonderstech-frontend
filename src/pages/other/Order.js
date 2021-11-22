// import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useHistory } from "react-router-dom";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {
  getOrderDetails,
  deliverOrder
} from "../../redux/actions/orderActions";
import Loader from "../../components/Loader/Loader";
import Alert from "../../components/alert/Alert";
import {
  ORDER_DELIVER_RESET,
} from '../../redux/constants/orderConstants'

const Order = ({ location, match }) => {
  const { pathname } = location;
  const history = useHistory();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { userInfo } = useSelector((state) => state.userLogin);

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  useEffect(() => {
    if (userInfo) {
      dispatch(getOrderDetails(match.params.id));
      
    } else {
      history.push("/login");
    }if(!order || successDeliver || order._id !== match.params.id){

      dispatch({ type: ORDER_DELIVER_RESET })
    }
  }, [userInfo, history]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <div className="container">
      <Alert variant="danger">Order Not Found! </Alert>
    </div>
  ) : (
    <Fragment>
      <MetaTags>
      <title>Wonders Tech | Order</title>
        <meta
          name="description"
          content="Order Page of Wonders Tech is the Best Laptop, Computer, Gaming PC, Component, Accessories, and Gadget retail & Online shop in Bangladesh."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Order
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {order && (
          <div className="container pt-5 pb-5">
            <h3>ORDER ID: {order._id}</h3>
            <div className="row pt-3">
              <div className="col-md-8">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <h3>SHIPPING</h3>
                    <p>
                      <strong>Name:</strong> {order.user.name}{" "}
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      <a href={`tel:${order.shippingAddress.phone}`}>
                        {" "}
                        {order.shippingAddress.phone}{" "}
                      </a>
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      <a href={`mailto:${order.user.email}`}>
                        {" "}
                        {order.user.email}{" "}
                      </a>
                    </p>
                    <p>
                      <strong>Address:</strong> {order.shippingAddress.division}{" "}
                      Division, {order.shippingAddress.district} District,{" "}
                      {order.shippingAddress.thana} Thana <br />
                      {order.shippingAddress.villRoadHouse}
                    </p>
                    {order.shippingAddress.townCity && (
                      <p>
                        <strong>Town/City: </strong>
                        {order.shippingAddress.townCity}
                      </p>
                    )}
                    {order.shippingAddress.postalCode && (
                      <p>
                        <strong>Postal Code: </strong>
                        {order.shippingAddress.postalCode}
                      </p>
                    )}
                    {order.isDelivered ? (
                      <Alert variant="success">Delivered</Alert>
                    ) : (
                      <Alert variant="danger">Not Delivered</Alert>
                    )}
                  </li>
                </ul>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <h3>PAYMENT</h3>

                    {order.isPaid ? (
                      <Alert variant="success"> Paid</Alert>
                    ) : (
                      <Alert variant="danger">Not Paid</Alert>
                    )}
                  </li>
                </ul>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <h3>ORDERITEMS</h3>
                  </li>
                  {order.orderItems.map((item) => (
                    <li
                      key={item._id}
                      className="list-group-item d-flex justify-content-between "
                    >
                      <p> {item.name} </p>
                      <p>
                        {" "}
                        {item.quantity} X {item.price} ={" "}
                        {item.quantity * item.price} ৳
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-md-4">
                <ul className="list-group">
                  <li className="list-group-item text-center">
                    <h3>ORDER INFO</h3>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <div>Items Price</div>
                    <div className="text-center">
                      {order.orderItems.reduce((acc, curr) => {
                        return acc + curr.quantity * curr.price;
                      }, 0)}{" "}
                      ৳
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <div>Tax Price</div>
                    <div className="text-center">0</div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <div>Shipping Price</div>
                    <div className="text-center"> {order.shippingPrice} ৳</div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <div>Total Price</div>
                    <div className="text-center">{order.totalPrice} ৳</div>
                  </li>
                </ul>

                <hr />
                <h3>Payment Method:</h3>
                <h4>{order.paymentMethod}</h4>
                <hr />
                {userInfo.isAdmin && !order.isDelivered && !order.isPaid && (
                  <button
                    onClick={deliverHandler}
                    className="btn btn-info btn-block"
                  >
                    MARK AS DELIVERED
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </LayoutOne>
    </Fragment>
  );
};

export default Order;
