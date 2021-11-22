import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect, useDispatch, useSelector } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import { useHistory } from "react-router-dom";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { saveUserShippingAddress } from "../../redux/actions/userActions";
import { createOrder } from "../../redux/actions/orderActions";
import Divisions from "../../data/form/division";
import Districts from "../../data/form/districts";
import { useToasts } from "react-toast-notifications";
import { districtShippingPrice } from "../../helpers/shippingPrice";

const Checkout = ({ location, cartItems, currency }) => {
  const { pathname } = location;
  let cartTotalPrice = 0;
  const { addToast } = useToasts();
  const history = useHistory();
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.userShippingAddress);

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [companyName, setCompanyName] = useState(shippingAddress.companyName);
  const [phone, setPhone] = useState(shippingAddress.phone);
  const [email, setEmail] = useState(shippingAddress.email);
  const [division, setDivision] = useState(
    shippingAddress.division ? shippingAddress.division : "Dhaka"
  );
  const [district, setDistrict] = useState(
    shippingAddress.district ? shippingAddress.district : "Gazipur"
  );
  const [thana, setThana] = useState(shippingAddress.thana);
  const [villRoadHouse, setVillRoadHouse] = useState(
    shippingAddress.villRoadHouse
  );
  const [townCity, setTownCity] = useState(shippingAddress.townCity);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [additionalText, setAdditionalText] = useState(
    shippingAddress.additionalText
  );
  const [paymentMethod, setPaymentMethod] = useState("bkash");

  const { userInfo } = useSelector((state) => state.userLogin);
  const cart = useSelector((state) => state.cartData);
  const { loading, error, success, order } = useSelector(
    (state) => state.orderCreate
  );

  const shippingPrice = districtShippingPrice(division, district);

  const totalPrice = cart.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login?req=checkout");
    }
    if (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [userInfo, addToast,history, success, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveUserShippingAddress({
        fullName,
        companyName,
        phone,
        email,
        division,
        district,
        thana,
        villRoadHouse,
        townCity,
        postalCode,
        additionalText,
      })
    );
    dispatch(
      createOrder({
        orderItems: cart,
        shippingAddress: {
          fullName,
          companyName,
          phone,
          email,
          division,
          district,
          thana,
          villRoadHouse,
          townCity,
          postalCode,
          additionalText,
        },
        paymentMethod,
        itemsPrice: cartTotalPrice,
        shippingPrice,
        totalPrice: totalPrice + shippingPrice,
      })
    );
  };

  return (
    <Fragment>
      <MetaTags>
      <title>Wonders Tech | Checkout</title>
        <meta
          name="description"
          content="Checkout Page of Wonders Tech is the Best Laptop, Computer, Gaming PC, Component, Accessories, and Gadget retail & Online shop in Bangladesh."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <form onSubmit={submitHandler}>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="billing-info-wrap">
                      <h3>Billing Details</h3>
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <div className="billing-info mb-20">
                            <label>
                              Full Name <span style={{ color: "red" }}>*</span>{" "}
                            </label>
                            <input
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              required
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>
                              Phone <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                              type="number"
                              placeholder="01*********"
                              maxLength="11"
                              minLength="11"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Email Address</label>
                            <input
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              type="email"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-select mb-20">
                            <label>
                              Division <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              value={division}
                              required
                              onChange={(e) => setDivision(e.target.value)}
                            >
                              {Divisions.map((division, i) => (
                                <option key={i} value={division}>
                                  {division}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-select mb-20">
                            <label>
                              District <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              value={district}
                              required
                              onChange={(e) => setDistrict(e.target.value)}
                            >
                              {Districts.map((district, i) => (
                                <option key={i} value={district}>
                                  {district}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>
                              Thana <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              required
                              value={thana}
                              onChange={(e) => setThana(e.target.value)}
                              className="billing-address"
                              placeholder="Enter your Thana Name"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>
                              Village/Road/House{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              required
                              value={villRoadHouse}
                              onChange={(e) => setVillRoadHouse(e.target.value)}
                              className="billing-address"
                              placeholder="House & Road number and village name"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Town / City</label>
                            <input
                              value={townCity}
                              onChange={(e) => setTownCity(e.target.value)}
                              placeholder="Dhaka/Mirpur"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Postcode / ZIP</label>
                            <input
                              value={postalCode}
                              onChange={(e) => setPostalCode(e.target.value)}
                              type="text"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="additional-info-wrap">
                        <h4>Additional information</h4>
                        <div className="additional-info">
                          <label>Order notes</label>
                          <textarea
                            value={additionalText}
                            onChange={(e) => setAdditionalText(e.target.value)}
                            placeholder="Notes about your order, e.g. special notes for delivery. "
                            name="message"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-5">
                    <div className="your-order-area">
                      <h3>Your order</h3>
                      <div className="your-order-wrap gray-bg-4">
                        <div className="your-order-product-info">
                          <div className="your-order-top">
                            <ul>
                              <li>Product</li>
                              <li>Total</li>
                            </ul>
                          </div>
                          <div className="your-order-middle">
                            <ul>
                              {cartItems.map((cartItem, key) => {
                                const discountedPrice = getDiscountPrice(
                                  cartItem.price,
                                  cartItem.discount
                                );
                                const finalProductPrice = (
                                  cartItem.price * currency.currencyRate
                                ).toFixed(2);
                                const finalDiscountedPrice = (
                                  discountedPrice * currency.currencyRate
                                ).toFixed(2);

                                discountedPrice != null
                                  ? (cartTotalPrice +=
                                      finalDiscountedPrice * cartItem.quantity)
                                  : (cartTotalPrice +=
                                      finalProductPrice * cartItem.quantity);
                                return (
                                  <li key={key}>
                                    <span className="order-middle-left">
                                      {cartItem.name} X {cartItem.quantity}
                                    </span>{" "}
                                    <span className="order-price">
                                      ৳{" "}
                                      {discountedPrice !== null
                                        ? (
                                            finalDiscountedPrice *
                                            cartItem.quantity
                                          ).toFixed(2)
                                        : (
                                            finalProductPrice *
                                            cartItem.quantity
                                          ).toFixed(2)}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className="your-order-bottom">
                            <ul>
                              <li className="your-order-shipping">Shipping</li>
                              <li> ৳ {shippingPrice}</li>
                            </ul>
                          </div>
                          <div className="your-order-total">
                            <ul>
                              <li className="order-total">Total</li>
                              <li>
                                ৳{" "}
                                {(
                                  shippingPrice + Number(cartTotalPrice)
                                ).toFixed(2)}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="payment-method">
                          <h3>Payment Method</h3>
                          <div>
                            <div className="custom-control custom-radio">
                              <input
                                required
                                value="Cash On Delivery"
                                type="radio"
                                id="customRadio1"
                                name="customRadio"
                                className="custom-control-input"
                                onChange={(e) =>
                                  setPaymentMethod(e.target.value)
                                }
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customRadio1"
                              >
                                Cash On Delivery
                              </label>
                            </div>
                            <div className="custom-control custom-radio">
                              <input
                                required
                                value="Bkash"
                                type="radio"
                                id="customRadio2"
                                name="customRadio"
                                className="custom-control-input"
                                onChange={(e) =>
                                  setPaymentMethod(e.target.value)
                                }
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customRadio2"
                              >
                                BKash
                              </label>
                            </div>
                            <div className="custom-control custom-radio">
                              <input
                                required
                                value="NOGOD"
                                type="radio"
                                id="customRadio3"
                                name="customRadio"
                                className="custom-control-input"
                                onChange={(e) =>
                                  setPaymentMethod(e.target.value)
                                }
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customRadio3"
                              >
                                NOGOD
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="place-order mt-25">
                        <button className="btn-hover">
                          {loading ? "Loading..." : "Place Order"}{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

export default connect(mapStateToProps)(Checkout);
