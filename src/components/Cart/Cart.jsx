import React, { Fragment, useContext, useState } from "react";
import { userContext } from "../../UserContext";
import {
  checkout,
  deleteCartItem,
  getCart,
  updateCartItem,
  useCartCrud,
  useGetCart,
} from "../../useCart";
import Loading from "../Loading/Loading";

export default function Cart() {
  let [details, setDetails] = useState("");
  let [phone, setPhone] = useState("");
  let [city, setCity] = useState("");
  let { isOpen, setOpen } = useContext(userContext);
  let { data } = useGetCart("getCart", getCart);
  let { mutate, isLoading: waitForDelete } = useCartCrud(deleteCartItem);
  let { isLoading: waitForCrud, mutate: update } = useCartCrud(updateCartItem);
  let { data: checkoutData, mutate: mutateAddress } = useCartCrud(checkout);

  function addAddress(e) {
    e.preventDefault();
    let shippingAddress = { details, phone, city };
    mutateAddress({ id: data?.data?.data?._id, shippingAddress });
  }

function payCart (e) {
  e.preventDefault();
  if (checkoutData?.data?.status == "success")
  window.location.href = checkoutData?.data?.session?.url;
}

  return (
    <Fragment>
      {waitForCrud && <Loading />}

      <aside
        className="right ps-3"
        style={isOpen ? { right: 0 } : { right: "-100%" }}
      >
        <i
          className="fa-solid fa-close fa-2x p-3 cursor-pointer"
          onClick={() => {
            setOpen(false);
          }}
        ></i>
        {data?.data.numOfCartItems ? (
          <Fragment>
            {" "}
            <h5 className="mainColor ms-2 fw-bold">
              Total Items: {data?.data.numOfCartItems}
            </h5>
            <p className="mainColor ms-2 fw-bold">
              Your Total Price: {data?.data?.data?.totalCartPrice} EGP
            </p>
            {data?.data?.data?.products.map((prod) => (
              <Fragment key={prod.product._id}>
                {waitForDelete && <Loading />}
                <div key={prod.product._id} className="row mb-3 ms-1">
                  <div className="col-4 col-md-2">
                    <img
                      src={prod.product.imageCover}
                      alt={prod.product.title}
                      className="w-100"
                    />
                  </div>
                  <div className="col-8 col-md-6">
                    <p>{prod.product.title}</p>
                    <p className="mainColor fw-bold">{prod.price} EGP</p>
                  </div>
                  <div className="col col-md-4 mt-3 mt-md-0">
                    <button
                      className="btn fw-bold btn-outline-success"
                      onClick={() =>
                        update({ id: prod.product._id, count: prod.count + 1 })
                      }
                    >
                      +
                    </button>
                    <span className=" fw-bold mx-2">{prod.count}</span>
                    <button
                      className="btn fw-bold btn-outline-success"
                      onClick={() => {
                        if (prod.count > 0) {
                          update({
                            id: prod.product._id,
                            count: prod.count - 1,
                          });
                        }
                      }}
                    >
                      -
                    </button>
                    <br />
                    <button
                      className="cursor-pointer btn btn-outline-danger mt-4"
                      onClick={() => mutate(prod.product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </Fragment>
            ))}
            {data?.data.numOfCartItems !== 0 && (
              <div className="text-center p-4">
                <button
                  className="btn btn-success w-100 mt-3 p-2 fw-semibold"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Continue to checkout
                </button>
              </div>
            )}
          </Fragment>
        ) : (
          <h2 className="ps-3 mainColor">Cart is empty</h2>
        )}
      </aside>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <input
                  onChange={(e) => {
                    setDetails(e.target.value);
                  }}
                  type="text"
                  className="form-control mb-2"
                  placeholder="details"
                />
                <input
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  type="text"
                  className="form-control mb-2"
                  placeholder="phone"
                />
                <input
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  type="text"
                  className="form-control mb-2"
                  placeholder="city"
                />
                <button
                  onClick={addAddress}
                  className="btn btn-success me-2"
                  type="submit"
                >
                  Add Address
                </button>
                {checkoutData?.data?.status == "success" && (
                  <button
                    onClick={payCart}
                    className="btn btn-success"
                    type="submit"
                  >
                    Pay Cart
                  </button>
                )}
              </form>
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
