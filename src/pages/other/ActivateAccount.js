import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../../components/alert/Alert";
import Loader from "../../components/Loader/Loader";

const ActivateAccount = ({ match }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [status, setStatus] = useState("");
  useEffect(() => {
    setLoading(true);
    fetch(`/api/users/activate/${match.params.token}`)
      .then((res) => res.json())
      .then((data) => {
        // setStatus(data.message);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setError(err.message);
      });
  }, [match]);

  // console.log(error);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger"> {error} </Alert>
      ) : (
        <div className="container my-5 col-md-8 mx-auto">
          <Alert variant="success">
            Your acccount is Active Please
            <Link className="btn btn-white" to="/login">
              {" "}
              Login{" "}
            </Link>
          </Alert>
        </div>
      )}
    </>
  );
};

export default ActivateAccount;
