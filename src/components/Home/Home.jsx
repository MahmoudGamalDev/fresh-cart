import React, { Fragment } from "react";
import Loading from "../Loading/Loading";
import { featuredProduct, useProducts } from "../../useProducts";
import Product from "../Product/Product";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";

export default function Home() {
  let { data, isLoading, error, isError } = useProducts(
    "products",
    featuredProduct
  );

  return (
    <Fragment>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {isLoading && <Loading />}
      {isError && (
        <h2 className="text-center text-danger mt-5">
          {error.message} <i class="fa-solid fa-face-frown"></i>
        </h2>
      )}
      <div className="container">
        <MainSlider />
        <CategorySlider />
      </div>

      <div className="row gy-4">
        {data?.map((prod) => (
          <Product key={prod._id} prod={prod} />
        ))}
      </div>
    </Fragment>
  );
}
