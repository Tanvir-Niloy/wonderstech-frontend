import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../layouts/LayoutAdmin";
import Tab from "react-bootstrap/Tab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, userEdit } from "../../redux/actions/userActions";
import Loader from "../../components/Loader/Loader";
import Alert from "../../components/alert/Alert";
import { useToasts } from "react-toast-notifications";

const AdminEditUser = ({ match, history }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: loadingEdit,
    error: errorEdit,
    success,
  } = useSelector((state) => state.userEdit);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    }
    if (errorEdit) {
      addToast(errorEdit, { appearance: "error", autoDismiss: true });
    }
    if (success) {
      addToast("User Update Successful", {
        appearance: "success",
        autoDismiss: true,
      });
      history.push("/admin/users");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserProfile(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userInfo, user, success, errorEdit,addToast,history,userId]);

  //   console.log(errorEdit);

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(userEdit({ _id: user._id, name, email, phone, isAdmin }));
  };

  return (
    <LayoutAdmin>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger"> {error} </Alert>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12 ml-auto mr-auto">
              <div className="login-register-wrapper">
                <Tab.Container defaultActiveKey="register">
                  <Tab.Content>
                    <Tab.Pane eventKey="register">
                      <div className="login-form-container">
                        <div className="login-register-form">
                          <form onSubmit={updateHandler}>
                            <label htmlFor="username">User Name</label>
                            <input
                              id="username"
                              type="text"
                              name="user-name"
                              required
                              placeholder="Username"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="eml">E-mail</label>
                            <input
                              id="eml"
                              name="user-email"
                              placeholder="youremail@gmail.com"
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="phn">Phone</label>
                            <input
                              id="phn"
                              name="user-email"
                              placeholder="01*********"
                              type="number"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            <input
                              className="mr-2"
                              id="admin"
                              name="user-email"
                              placeholder="01*********"
                              type="checkbox"
                              checked={isAdmin}
                              onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                            <label htmlFor="admin">Set Admin</label>

                            <div className="button-box">
                              <button type="submit">
                                {loadingEdit ? "Loading" : "Update"}
                              </button>
                              <Link className="ml-2" to="/admin/users">
                                <button>Back</button>
                              </Link>
                            </div>
                          </form>
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default AdminEditUser;
