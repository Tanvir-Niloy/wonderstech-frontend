import React, { useEffect } from "react";
import ProductList from "../../components/admin/Product";
import LayoutAdmin from "../../layouts/LayoutAdmin";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/actions/productActions";
import Loader from "../../components/Loader/Loader";
import Alert from "../../components/alert/Alert";

const AdminProduct = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.productData
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success,
  } = useSelector((state) => state.productDelete);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(fetchProducts());
    } else {
      history.push("/");
    }
  }, [dispatch, userInfo, history, success]);

  return (
    <>
      <LayoutAdmin>
        <div className="container-lg">
          <div className="d-flex justify-content-between my-2">
            <h1>Product List</h1>
            <Link to="/admin/add-product">
              <button className="btn btn-primary">Create Product</button>
            </Link>
          </div>
          <Link to="/admin/dashboard">
            <button className="btn btn-light"> &larr; Back</button>
          </Link>
          {loadingDelete && <Loader />}
          {errorDelete && <Alert variant="danger"> {errorDelete} </Alert>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Alert> {error} </Alert>
          ) : (
            <ProductList products={products} />
          )}
        </div>
      </LayoutAdmin>
    </>
  );
};

export default AdminProduct;
