import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Body from "./components/body/Body";
import { DataProvider } from "./GlobalState";

function App() {
  

  return (
    <DataProvider>
    <BrowserRouter>
      <div className="app">
        <Header />
        <Body />
        <Footer />
      </div>
    </BrowserRouter>
    </DataProvider>
  );
}

export default App;
