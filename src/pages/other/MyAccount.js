import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import { useToasts } from "react-toast-notifications";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Loader from "../../components/Loader/Loader";
import Alert from "../../components/alert/Alert";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  getUserProfile,
  updateUserProfile,
} from "../../redux/actions/userActions";
import { getMyOrderList } from "../../redux/actions/orderActions";

const MyAccount = ({ location }) => {
  const { pathname } = location;
  const { addToast } = useToasts();
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.userLogin);
  const userDetails = useSelector((state) => state.userDetails);
  const {
    error,
    loading,
    success,
    user: updatedUser,
  } = useSelector((state) => state.userUpdateProfile);
  const { user } = userDetails;

  const myOrders = useSelector((state) => state.orderMyList);
  const { loading: loadingMyOrders, error: errorMyOrders, orders } = myOrders;

  useEffect(() => {
    if (!userInfo) {
      history.push("/register");
    } else {
      if (!user.name) {
        dispatch(getUserProfile("profile"));
        dispatch(getMyOrderList());
      } else {
        dispatch(getMyOrderList());
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, history, user]);

  useEffect(() => {
    if (success) {
      addToast("Update Successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      dispatch(getUserProfile("profile"));
    }
    if (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, [dispatch, success, error]);

  // console.log(updatedUser);

  const updateHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      addToast("Password did not match", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      dispatch(
        updateUserProfile({
          name,
          email,
          password,
        })
      );
    }
  };

  return (
    <Fragment>
      <MetaTags>
      <title>Wonders Tech | MyAccount</title>
        <meta
          name="description"
          content="MyAccount Page of Wonders Tech is the Best Laptop, Computer, Gaming PC, Component, Accessories, and Gadget retail & Online shop in Bangladesh."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        My Account
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-12">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Edit your account information{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>My Account Information</h4>
                              <h5>Your Personal Details</h5>
                            </div>
                            <form onSubmit={updateHandler}>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Full Name</label>
                                    <input
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Email Address</label>
                                    <input
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      type="email"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Password</label>
                                    <input
                                      value={password}
                                      onChange={(e) =>
                                        setPassword(e.target.value)
                                      }
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Confirm Password</label>
                                    <input
                                      value={confirmPassword}
                                      onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                      }
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  <button type="submit">
                                    {loading ? "Loading..." : "Update Profile"}
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    {orders && orders.length > 0 && (
                      <Card className="single-my-account mb-20">
                        <Card.Header className="panel-heading">
                          <Accordion.Toggle variant="link" eventKey="1">
                            <h3 className="panel-title">
                              <span>2 .</span> See My Orders
                            </h3>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                          <Card.Body>
                            {loadingMyOrders ? (
                              <Loader />
                              
                            ) : errorMyOrders ? (
                              <Alert>{errorMyOrders} </Alert>
                            ) : (
                              <table className="table table-striped table-responsive-md">
                                <thead>
                                  <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">DATE</th>
                                    <th scope="col">TOTAL</th>
                                    <th scope="col">PAID</th>
                                    <th scope="col">DELIVERED</th>
                                    <th scope="col">DETAILS</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orders &&
                                    orders.map((order) => (
                                      <tr key={order._id}>
                                        <th scope="row"> {order._id} </th>
                                        <td>
                                          {" "}
                                          {order.createdAt
                                            .substring(0, 10)
                                            .split("-")
                                            .reverse()
                                            .join("-")}{" "}
                                        </td>
                                        <td> {order.totalPrice}৳ </td>
                                        <td> {order.isPaid ? "✔" : "❌"} </td>
                                        <td>
                                          {" "}
                                          {order.isDeliverd ? "✔" : "❌"}{" "}
                                        </td>
                                        <td>
                                          <Link
                                            className="btn btn-sm btn-light"
                                            to={`order/${order._id}`}
                                          >
                                            Details
                                          </Link>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            )}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    )}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object,
};

export default MyAccount;
