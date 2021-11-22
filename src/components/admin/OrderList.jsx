import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../redux/actions/productActions";

const OrderList = ({ orders }) => {
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
              <th scope="col">ID</th>
              <th scope="col">USER</th>
              <th scope="col">DATE</th>
              <th scope="col">TOTAL</th>
              <th scope="col">PAID</th>
              <th scope="col">DELIVERED</th>
              <th scope="col">*</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  {/* <td scope="row">{order.id}</td> */}
                  <td> {order._id} </td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}৳ </td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="text-danger fa fa-times"></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="text-danger fa fa-times"></i>
                    )}
                  </td>
                  <td>
                    <Link title="order details" to={`/order/${order._id}`}>
                      <button className="btn btn-sm btn-light">Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
