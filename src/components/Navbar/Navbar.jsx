import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../finalProject assets/images/freshcart-logo.svg";
import { useContext } from "react";
import { userContext } from "../../UserContext";
import { getCart, useGetCart } from "../../useCart";

export default function Navbar() {
  let { user, setUser, setOpen, Login } = useContext(userContext);
  let navigate = useNavigate();
  let { data } = useGetCart("getCart", getCart);

  function logOut() {
    setUser(null);
    localStorage.removeItem("userToken");
    navigate("/");
  }

  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm navbar-light bg-light  sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="home">
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {user && (
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="products">
                    Products
                  </Link>
                </li>
             
                <li className="nav-item">
                  <Link className="nav-link" to="brands">
                    Brands
                  </Link>
                </li>
              </ul>
            )}

            {!user ? (
              <ul className="navbar-nav ms-auto mt-2 mt-lg-0 d-flex align-items-center">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="register">
                    Register
                  </Link>
                </li>
                <li
                  data-bs-toggle={!user ? "modal" : ""}
                  data-bs-target="#exampleModal"
                  className="nav-item position-relative"
                >
                  <i className="fa-solid fa-cart-shopping cursor-pointer"></i>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto mt-2 mt-lg-0 d-flex align-items-center">
                <li className="nav-item">
                  <span className="nav-link cursor-pointer" onClick={logOut}>
                    Logout
                  </span>
                </li>

                <li
                  onClick={() => {
                    setOpen(true);
                  }}
                  data-bs-toggle={!user ? "modal" : ""}
                  data-bs-target="#exampleModal"
                  className="nav-item position-relative mx-1 my-2"
                >
                  <i className="fa-solid fa-cart-shopping cursor-pointer"></i>
                  {data?.data.numOfCartItems !== 0 && (
                    <span className="cart-counter text-white bg-success d-flex justify-content-center align-items-center position-absolute w-100 h-100 p-3 rounded-circle">
                      {data?.data.numOfCartItems || 0}
                    </span>
                  )}
                </li>

                <li className="nav-item ms-5">
                  <span className="nav-link d-flex">
                    <span className="me-1">Hi</span>
                    <span className="fw-bold">{Login}</span>
                  </span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body fw-semibold text-bg-success">
              Login to view cart
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
