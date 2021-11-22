import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useToasts } from "react-toast-notifications";
import Tab from "react-bootstrap/Tab";
// import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { register } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Register = ({ location }) => {
  const { pathname } = location;
  const history = useHistory();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const {
    loading: regLoading,
    error: regError,
    userInfo: regInfo,
  } = userRegister;

  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(
      register(regName, regPhone, regEmail, regPassword, confirmPassword)
    );
  };

  useEffect(() => {
    if (regError) {
      addToast(regError, { appearance: "error", autoDismiss: true });
    } else if (regInfo) {
      addToast(regInfo.message, {
        appearance: "success",
        // autoDismiss: true,
      });
      // history.push("/");
    }
  }, [regInfo, regError, history, addToast]);

  return (
    <Fragment>
      <MetaTags>
      <title>Wonders Tech | Register</title>
        <meta
          name="description"
          content="Register Page of Wonders Tech is the Best Laptop, Computer, Gaming PC, Component, Accessories, and Gadget retail & Online shop in Bangladesh."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="register">
                    <Tab.Content>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={registerHandler}>
                              <label htmlFor="username">
                                User Name{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                id="username"
                                type="text"
                                name="user-name"
                                required
                                placeholder="Username"
                                value={regName}
                                onChange={(e) => setRegName(e.target.value)}
                              />
                              <label htmlFor="eml">
                                E-mail <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                id="eml"
                                name="user-email"
                                placeholder="youremail@gmail.com"
                                type="email"
                                required
                                value={regEmail}
                                onChange={(e) => setRegEmail(e.target.value)}
                              />
                              <label htmlFor="phn">
                                Phone <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                id="phn"
                                name="user-email"
                                placeholder="01*********"
                                type="number"
                                required
                                value={regPhone}
                                onChange={(e) => setRegPhone(e.target.value)}
                              />
                              <label htmlFor="pas">
                                Password <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                id="pas"
                                type="password"
                                name="user-password"
                                placeholder="Enter your password"
                                required
                                value={regPassword}
                                onChange={(e) => setRegPassword(e.target.value)}
                              />

                              <label htmlFor="cpas">
                                Confirm Password{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                id="cpas"
                                type="password"
                                name="user-password"
                                placeholder="confirm your password"
                                required
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>
                                    {regLoading ? "Loading" : "Register"}
                                  </span>
                                </button>
                              </div>
                            </form>
                            <p className="mt-3">
                              Already Registered? Please{" "}
                              <Link to={process.env.PUBLIC_URL + "/login"}>
                                Login
                              </Link>
                            </p>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Register.propTypes = {
  location: PropTypes.object,
};

export default Register;
