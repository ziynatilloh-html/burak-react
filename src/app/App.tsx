import React from "react";
import "../css/app.css";
// import { RippleBadge } from "./MaterialTheme/styled";
import { Route, Switch, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import { HomePage } from "./screens/homePage";
import { ProductsPage } from "./screens/productsPage";
import { OrdersPage } from "./screens/ordersPage";
import { UserPage } from "./screens/userPage";
import { HomeNavbar } from "./components/headers/HomeNavbar";
import { Footer } from "./components/footer";
import { OtherNavbar } from "./components/headers/OtherNavbar";
function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
      <Switch>
        O
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
