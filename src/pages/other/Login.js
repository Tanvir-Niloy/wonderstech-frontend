import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useToasts } from "react-toast-notifications";
import Tab from "react-bootstrap/Tab";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { login } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
} from "../../redux/constants/userConstants";

const Login = ({ location }) => {
  const { pathname } = location;
  const history = useHistory();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error", autoDismiss: true });
    } else if (userInfo) {
      addToast("Login Successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      history.push(redirect);
    }
  }, [history, userInfo, error, addToast, redirect]);

  const responseGoogleSuccess = async (res) => {
    try {
      const { data } = await axios.post("/api/users/google-auth", {
        tokenId: res.tokenId,
      });
      if (data) {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
    // const data = await resData.json();
  };

  const responseGoogleFail = (res) => {
    console.log("fail res is", res);
  };

  return (
    <Fragment>
      <MetaTags>
      <title>Wonders Tech | login</title>
        <meta
          name="description"
          content="Wonders Tech is the Best Laptop, Computer, Gaming PC, Component, Accessories, and Gadget retail & Online shop in Bangladesh."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <GoogleLogin
                              clientId="75427162633-iu9s632oo57m1uil0og4ugbrqb3qjjdg.apps.googleusercontent.com"
                              buttonText="Login With Google"
                              onSuccess={responseGoogleSuccess}
                              onFailure={responseGoogleFail}
                              cookiePolicy={"single_host_origin"}
                              className="mb-4 w-100 bg-primary text-light"
                            />
                            <form onSubmit={loginHandler}>
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Email or Phone"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <input
                                type="password"
                                name="user-password"
                                required
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                </div>
                                <button type="submit">
                                  <span>{loading ? "Loading" : "Login"} </span>
                                </button>
                              </div>
                            </form>
                            <p className="mt-3">
                              Don't Have Account? Please{" "}
                              <Link to={process.env.PUBLIC_URL + "/register"}>
                                Register
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

Login.propTypes = {
  location: PropTypes.object,
};

export default Login;
