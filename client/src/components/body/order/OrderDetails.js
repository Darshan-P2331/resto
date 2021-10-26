import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

export default function OrderDetails() {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetails, setOrderDetails] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) setOrderDetails(item);
      });
    }
  }, [params.id, history]);

  if (orderDetails.length === 0) return null;

  return (
    <section className="shopping-cart-container active">
      <div className="products-container">
        <h3 className="title">products</h3>
        <div className="box-container">
          {orderDetails.orderItems.map((item) => (
            <div className="box" key={item._id}>
              <img src={item.images.url} alt="" />
              <div className="content">
                <h3>{item.title}</h3>
                <span> quantity : </span>
                <span>{item.quantity}</span>
                <br />
                <span> price : </span>
                <span className="price"> ${item.price} </span>
              </div>
            </div>
          ))}
        </div>
      </div>
        <div className="cart-total">
          <h3 className="title"> shipping address </h3>
          <div className="box">
            <h3 className="subtotal">
              {orderDetails.shippingAddress.address},
            </h3>
            <h3 className="subtotal">
              {orderDetails.shippingAddress.city} -{" "}
              {orderDetails.shippingAddress.postalCode}
            </h3>
            <h3 className="subtotal">{orderDetails.shippingAddress.country}</h3>
          </div>
        </div>
        <div className="cart-total">
          <h3 className="title"> payment details </h3>
          <div className="box">
              <h3 className="subtotal">Method: {orderDetails.paymentMethod}</h3>
            <h3 className="subtotal">
              Id: {orderDetails.paymentResult.id},
            </h3>
            <h3 className="subtotal">
              status: <span className='success'>{orderDetails.paymentResult.status ? "Success": ""}</span>
            </h3>
            <h3 className="subtotal">
              Date: {" "}
              {orderDetails.paymentResult.update_time}
            </h3>
            <h3 className="subtotal">
              Email: {" "}
              {orderDetails.paymentResult.email_address}
            </h3>
          </div>
        </div>
    </section>
  );
}
