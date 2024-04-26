import { useParams } from "react-router-dom";
import { specificProduct, useProducts } from "../../useProducts";
import Loading from "../Loading/Loading";
import { Fragment } from "react";
import { addToCart, useCartCrud } from "../../useCart";
import Slider from "react-slick";

export default function ProductDetails() {
  let { isLoading, mutate } = useCartCrud(addToCart);
  let { id } = useParams();

  let { data, error, isError } = useProducts("specificProduct", () =>
    specificProduct(id)
  );

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <Fragment>
      {isLoading && <Loading />}
      {isError && (
        <h2 className="text-center text-danger mt-5">
          {error.message} <i class="fa-solid fa-face-frown"></i>
        </h2>
      )}
      <div className="row gy-4 align-items-center mt-5 pb-5">
        <div className="col-md-4">
          <Slider {...settings}>
            {data?.images.map((img) => (
              <img src={img} className="w-100" key={img} alt={data?.title} />
            ))}
          </Slider>
        </div>
        <div className="col-md-8 mt-2">
          <h3>{data?.title}</h3>
          <p>{data?.description}</p>
          <div>
            <span className=" fw-semibold mainColor">
              {data?.category?.name}
            </span>
          </div>
          <div className="box d-flex justify-content-between mt-3">
            <span className="fw-bold fs-3">{data?.price} EGP</span>
            <span className="fw-bold fs-3">
              {data?.ratingsAverage}{" "}
              <i className="fa-solid fa-star ratingColor"></i>
            </span>
          </div>
          <button
            className="btn btn-success mt-3 w-100"
            onClick={() => {
              mutate(data?._id);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Fragment>
  );
}
