import React, { useEffect } from "react";
import LayoutAdmin from "../../layouts/LayoutAdmin";
import UserList from "../../components/admin/UserList";
import { userList } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { useToasts } from "react-toast-notifications";
import Alert from "../../components/alert/Alert";
import { Link, useHistory } from "react-router-dom";

const AdminUsers = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { addToast } = useToasts();

  const { loading, error, users } = useSelector((state) => state.userList);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { error: deleteError, status: deleteStatus } = useSelector(
    (state) => state.userDelete
  );

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(userList());
    } else {
      history.push("/");
    }

    if (deleteError) {
      addToast(deleteError, { appearance: "error", autoDismiss: true });
    }
    if (deleteStatus) {
      addToast(deleteStatus.message, {
        appearance: "success",
        autoDismiss: true,
      });
    }
  }, [dispatch, deleteError, history, deleteStatus]);

  return (
    <LayoutAdmin>
      <div className="container-lg">
        <h1>Users List</h1>
        <Link to="/admin/dashboard">
          <button className="btn btn-light"> &larr; Back</button>
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant="danger"> {error} </Alert>
        ) : (
          <UserList users={users} />
        )}
      </div>
    </LayoutAdmin>
  );
};

export default AdminUsers;
