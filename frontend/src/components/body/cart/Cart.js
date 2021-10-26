import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import PaypalButton from "./PaypalButton";

export default function Cart() {
  const [total, setTotal] = useState(0);
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [cart, setCart] = state.userAPI.cart;

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const makePayment = async (payment) => {
    try {
      
      const res = await axios.post("/api/payment", {
        orderItems: cart,
        total,
        payment,
        paidAt: Date.now()
      },{
        headers: {Authorization: token}
      });
      setCart([])
      addToCart([])
      alert(res.data.msg)
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  return (
    <section className="shopping-cart-container active">
      <div className="products-container">
        <h3 className="title">your products</h3>
        <div className="box-container">
          {cart.map((item) => (
            <div className="box" key={item._id}>
              <i
                className="fas fa-times"
                onClick={() => removeProduct(item._id)}
              ></i>
              <img src={item.images.url} alt="" />
              <div className="content">
                <h3>{item.title}</h3>
                <span> quantity : </span>
                <div className="wrapper">
                  <span className="minus" onClick={() => decrement(item._id)}>
                    -
                  </span>
                  <span className="num">
                    {item.quantity < 10 ? "0" + item.quantity : item.quantity}
                  </span>
                  <span className="plus" onClick={() => increment(item._id)}>
                    +
                  </span>
                </div>
                <br />
                <span> price : </span>
                <span className="price"> ${item.price} </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cart-total">
        <h3 className="title"> cart total </h3>

        <div className="box">
          <h3 className="subtotal">
            {" "}
            subtotal({cart.reduce((a, c) => a + c.quantity, 0)} items) :{" "}
            <span>${cart.reduce((a, c) => a + c.price * c.quantity, 0)}</span>{" "}
          </h3>
          <h3 className="total">
            {" "}
            total :{" "}
            <span>
              ${cart.reduce((a, c) => a + c.price * c.quantity, 0)}
            </span>{" "}
          </h3>
          <PaypalButton total={total} tranSuccess={makePayment} />
        </div>
      </div>
    </section>
  );
}
