import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

export default function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [search, setSearch] = state.productsAPI.search;
  const [menu, setMenu] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);

  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem("firstLogin");
    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <Link to="/create_product" onClick={toggleMenu}>
          Create Product
        </Link>
        <Link to="/category" onClick={toggleMenu}>
          Category
        </Link>
        <Link to="/allorders" onClick={toggleMenu}>
          Orders
        </Link>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <Link to="#about">about</Link>
        <Link to="/profile">profile</Link>
      </>
    );
  };

  const toggleMenu = () => setMenu(!menu);

  return (
    <header className="header">
      <Link to="/" className="logo">
        {" "}
        <i className="fas fa-utensils"></i> resto.{" "}
      </Link>

      <nav className={menu ? "navbar active" : "navbar"}>
        <Link to="/">home</Link>
        {isAdmin ? adminRouter() : loggedRouter()}
      </nav>

      <div className="icons">
        <div id="menu-btn" className="fas fa-bars" onClick={toggleMenu}></div>
        <Link to='/' id="search-btn" className="fas fa-search" onClick={() => setToggleSearch(!toggleSearch)} ></Link>
        <Link to="/cart" className="fas fa-shopping-cart" value={cart.length} ></Link>
        {isLogged ? (
          <Link
            to=""
            onClick={logoutUser}
            id="login-btn"
            className="fas fa-sign-out-alt danger"
          ></Link>
        ) : (
          <Link to="/signin" id="login-btn" className="fas fa-user"></Link>
        )}
      </div>
      <section className={`search-form-container ${toggleSearch && 'active'}`}>

    <form>
        <input type="search" name="" placeholder="search here..." value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} />
        <label htmlFor="search-box" className="fas fa-search"></label>
    </form>

</section>
    </header>
  );
}
