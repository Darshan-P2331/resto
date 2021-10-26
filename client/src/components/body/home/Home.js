import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

export default function Home() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [products] = state.productsAPI.products;
  const addCart = state.userAPI.addCart;
  const [, setCategory] = state.productsAPI.category;
  const [, setSearch] = state.productsAPI.search;
  const [isLogged] = state.userAPI.isLogged;
  const [animate, setAnimate] = useState({ x: 0, y: 0 });

  const history = useHistory();
  const ref = useRef(null);

  const handleCategory = (value) => {
    setCategory(value);
    setSearch("");
  };

  return (
    <div>
      <section
        className="home"
        id="home"
        onMouseMove={(e) =>
          setAnimate({
            x: (window.innerWidth - e.pageX * 2) / 90,
            y: (window.innerHeight - e.pageY * 2) / 90,
          })
        }
        onMouseLeave={() => setAnimate({ x: 0, y: 0 })}
      >
        <div className="content">
          <span>welcome foodies</span>
          <h3>different spices for the different tastes 😋</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis unde
            dolores temporibus hic quam debitis tenetur harum nemo.
          </p>
          <button className="btn" onClick={() => ref.current.scrollIntoView()}>
            order now
          </button>
        </div>

        <div className="image">
          <img src="./images/home-img.png" alt="" className="home-img" />
          <img
            src="./images/home-parallax-img.png"
            alt=""
            className="home-parallax-img"
            style={{
              transform: `translateX(${animate.y}px) translateY(${animate.x}px)`,
            }}
          />
        </div>
      </section>

      <section className="about" id="about">
        <div className="image">
          <img src="https://res.cloudinary.com/dhtfc36hh/image/upload/v1635258437/Resto/about-img_gsicqy.png" alt="" />
        </div>

        <div className="content">
          <span>why choose us?</span>
          <h3 className="title">what's make our food delicious!</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ut
            explicabo, numquam iusto est a ipsum assumenda tempore esse
            corporis?
          </p>
          <button className="btn">read more</button>
          <div className="icons-container">
            <div className="icons">
              <img src="./images/serv-1.png" alt="fast delivery" />
              <h3>fast delivery</h3>
            </div>
            <div className="icons">
              <img src="./images/serv-2.png" alt="fresh food" />
              <h3>fresh food</h3>
            </div>
            <div className="icons">
              <img src="./images/serv-3.png" alt="best quality" />
              <h3>best quality</h3>
            </div>
            <div className="icons">
              <img src="./images/serv-4.png" alt="24/7 support" />
              <h3>24/7 support</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="category">
        <div className="box" onClick={() => handleCategory("")}>
          <img src="" alt="" />
          <h3>All</h3>
        </div>
        {categories.map((item) => (
          <div
            className="box"
            key={item._id}
            onClick={() => handleCategory("category=" + item._id)}
          >
            <img src={item.image.url} alt={item.name} />
            <h3>{item.name}</h3>
          </div>
        ))}
      </section>

      <section className="popular" ref={ref}>
        <div className="heading">
          <span>our menu</span>
          <h3>our top dishes</h3>
        </div>

        <div className="box-container">
          {products.map((product) => (
            <div className="box" key={product._id}>
              <div className="image">
                <img src={product.images.url} alt="" />
              </div>
              <div className="content">
                <h3>{product.title}</h3>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                  <span>
                    {product.sold !== 0
                      ? `(${
                          product.sold < 10 ? "0" + product.sold : product.sold
                        })`
                      : null}
                  </span>
                </div>
                <div className="price">${product.price}</div>
                <button
                  className="btn"
                  onClick={() =>
                    isLogged ? addCart(product) : history.push("/signin")
                  }
                >
                  add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="banner">
        <div
          className="row-banner"
          style={{
            background:
              "url(https://res.cloudinary.com/dhtfc36hh/image/upload/v1635258577/Resto/row-banner_dndjqm.png) center center / cover no-repeat",
          }}
        >
          <div className="content">
            <span>double cheese</span>
            <h3>burger</h3>
            <p>with cococola and fries</p>
            <button className="btn">order now</button>
          </div>
        </div>

        <div className="grid-banner">
          <div className="grid">
            <img src="https://res.cloudinary.com/dhtfc36hh/image/upload/v1635258484/Resto/banner-1_vfzpmw.png" alt="" />
            <div className="content">
              <span>special offer</span>
              <h3>upto 50% off</h3>
              <button className="btn">order now</button>
            </div>
          </div>
          <div className="grid">
            <img src="https://res.cloudinary.com/dhtfc36hh/image/upload/v1635258512/Resto/banner-2_szj2ev.png" alt="" />
            <div className="content center">
              <span>special offer</span>
              <h3>upto 25% extra</h3>
              <button className="btn">order now</button>
            </div>
          </div>
          <div className="grid">
            <img src="https://res.cloudinary.com/dhtfc36hh/image/upload/v1635258539/Resto/banner-3_lfst56.png" alt="" />
            <div className="content">
              <span>limited offer</span>
              <h3>100% cashback</h3>
              <button className="btn">order now</button>
            </div>
          </div>
        </div>
      </section>

      <section className="order">
        <div className="heading">
          <span>order now</span>
          <h3>fastest home delivery</h3>
        </div>
        <div className="icons-container">
          <div className="icons">
            <img src="./images/icon-1.png" alt="" />
            <h3>7:00am to 10:30pm</h3>
          </div>

          <div className="icons">
            <img src="./images/icon-2.png" alt="" />
            <h3>+123-456-7890</h3>
          </div>

          <div className="icons">
            <img src="./images/icon-3.png" alt="" />
            <h3>mumbai, india - 400104</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
