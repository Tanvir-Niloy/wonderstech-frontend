import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../redux/actions/productActions";

const ProductList = ({ products }) => {
  const disptach = useDispatch();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to Delete this product?")) {
      disptach(deleteProduct(id));
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <table className="table table-striped table-hover table-responsive-md table-sm">
          <thead>
            <tr>
              <th scope="col">NAME</th>
              <th scope="col">PRICE</th>
              <th scope="col">STOCK</th>
              <th scope="col">CATEGORY</th>
              <th scope="col">RATING</th>
              <th scope="col">*</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product.id}>
                  {/* <td scope="row">{product.id}</td> */}
                  <td> {product.name} </td>
                  <td>{product.price}৳</td>
                  <td>{product.stock}</td>
                  <td>{product.category.map((cat) => cat)[0]}</td>
                  <td>{product.rating}</td>
                  <td>
                    <Link
                      title="edit product"
                      to={`/admin/edit-product/${product.id}`}
                    >
                      <button className="btn btn-sm btn-info">
                        <i className="fa fa-edit"></i>
                      </button>
                    </Link>
                    <button
                      title="delete product"
                      className="btn btn-sm btn-danger ml-1"
                      onClick={() => deleteHandler(product.id)}
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

export default ProductList;
