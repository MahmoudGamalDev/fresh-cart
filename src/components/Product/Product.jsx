import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { addToCart, useCartCrud } from "../../useCart";
import Loading from "../Loading/Loading";

export default function Product({ prod }) {
  let [heart, setHeart] = useState(false);
  let { isLoading, mutate } = useCartCrud(addToCart);

  return (
    <Fragment>
      {isLoading && <Loading />}
      <div className="col-6 col-md-3 col-lg-2 cursor-pointer">
        <div className="product p-2 position-relative">
        <i
          className={`${heart ? 'fa-solid' : "fa-regular"} fa-heart fa-2x position-absolute start-0 top-0 text-success`}
          onClick={() => {
            setHeart(!heart);
          }}
        ></i>
          <Link to={`/productDetails/${prod._id}`}>
          <img src={prod.imageCover} className="w-100" alt={prod.title} />
            <h5 className="mainColor mt-2 fw-semibold">{prod.category.name}</h5>
            <p>{prod.title}</p>
            <div className="box d-flex justify-content-between">
              <span className="fw-semibold">{prod.price} EGP</span>
              <span>
                {prod.ratingsAverage}{" "}
                <i className="fa-solid fa-star ratingColor"></i>
              </span>
            </div>
          </Link>
          <button
            className="btn btn-success mt-2 w-100"
            onClick={() => {
              mutate(prod._id);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Fragment>
  );
}
