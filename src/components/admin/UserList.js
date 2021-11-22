import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userDelete } from "../../redux/actions/userActions";

const UserList = ({ users }) => {
  const disptach = useDispatch();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to Delete this user?")) {
      disptach(userDelete(id));
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <table className="table table-striped table-hover table-responsive-md table-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">PHONE</th>
              <th scope="col">EMAIL</th>
              <th scope="col">ADMIN</th>
              <th scope="col">*</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td scope="row">{user._id}</td>
                  <td> {user.name} </td>
                  <td>
                    {" "}
                    <a href={`tel:${user.phone}`}> {user.phone} </a>{" "}
                  </td>
                  <td>
                    <a href={`mailto:${user.email}`}> {user.email} </a>{" "}
                  </td>
                  <td>
                    {" "}
                    {user.isAdmin ? (
                      <span style={{ color: "green" }}> ✔ </span>
                    ) : (
                      <span style={{ color: "green" }}> ❌ </span>
                    )}{" "}
                  </td>

                  <td>
                    <Link title="edit user" to={`/admin/edit/${user._id}`}>
                      <button className="btn btn-sm btn-info">
                        <i className="fa fa-edit"></i>
                      </button>
                    </Link>
                    <button
                      title="delete user"
                      className="btn btn-sm btn-danger ml-1"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
