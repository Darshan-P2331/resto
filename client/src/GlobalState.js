import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import CategoriesAPI from "./api/CategoriesAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.post("/user/refresh_token");

        setToken(res.data.access_token);
        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000); // 10 minutes
      };
      refreshToken();
    }
  }, []);

  ProductsAPI();
  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
