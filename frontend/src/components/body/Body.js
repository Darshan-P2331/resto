import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import ActivateEmail from "./auth/ActivateEmail";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import NotFound from "../utils/NotFound";
import Register from "./auth/Register";
import SignIn from "./auth/SignIn";
import Cart from "./cart/Cart";
import Categories from "./categories/Categories";
import CreateProduct from "./createProduct/CreateProduct";
import Products from "./products/Products";
import EditUser from "./profile/EditUser";
import Profile from "./profile/Profile";
import Home from "./home/Home";
import OrderDetails from "./order/OrderDetails";
import OrderHistory from "./order/OrderHistory";

export default function Body() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <main>
      <Route exact path="/" component={isAdmin ? Products : Home} />
      <Route path="/signin" component={isLogged ? NotFound : SignIn} />
      <Route path="/register" component={isLogged ? NotFound : Register} />
      <Route path="/profile" component={isLogged ? Profile : NotFound} />
      <Route path="/cart" component={isLogged ? Cart : NotFound} />
      <Route path="/order/:id" component={isLogged ? OrderDetails : NotFound} />
      <Route path="/allorders" component={isAdmin ? OrderHistory : NotFound} />
      <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} />
      <Route
        exact
        path="/user/activate/:activation_token"
        component={isLogged ? NotFound : ActivateEmail}
      />
      <Route
        exact
        path="/forgot_password"
        component={isLogged ? NotFound : ForgotPassword}
      />
      <Route
        exact
        path="/create_product"
        component={isAdmin ? CreateProduct : NotFound}
      />
      <Route
        exact
        path="/edit_product/:id"
        component={isAdmin ? CreateProduct : NotFound}
      />
      <Route
        exact
        path="/category"
        component={isAdmin ? Categories : NotFound}
      />
      <Route
        exact
        path="/user/reset/:token"
        component={isLogged ? NotFound : ResetPassword}
      />
    </main>
  );
}
