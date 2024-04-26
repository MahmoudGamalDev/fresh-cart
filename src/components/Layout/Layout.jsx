import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import Cart from "../Cart/Cart";

export default function Layout() {
  return (
    <Fragment>
      <Navbar />
      <Cart />
      <div className="container">
        <Outlet />
      </div>
    </Fragment>
  );
}
