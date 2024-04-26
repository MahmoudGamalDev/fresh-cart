import React, { Fragment, useState } from "react";
import Loading from "../Loading/Loading";
import { featuredProduct, useProducts } from "../../useProducts";
import Product from "../Product/Product";
import { Helmet } from "react-helmet";

export default function Products() {
  let { data, isLoading, error, isError } = useProducts(
    "products",
    featuredProduct
  );

  let [searchedArr, setSearchedArr] = useState([]);

  function search(e) {
    let term = e.target.value;
    let selectedProducts = data?.filter((ele) =>
      ele.title.toLowerCase().trim().includes(term.toLowerCase().trim())
    );

    setSearchedArr(selectedProducts);
  }

  return (
    <Fragment>
      <Helmet>
        <title>Products</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {isLoading && <Loading />}
      {isError && (
        <h2 className="text-center text-danger">
          {error.message} <i class="fa-solid fa-face-frown"></i>
        </h2>
      )}
      <div className="w-75 mx-auto">
        <input
          onChange={search}
          id="productSearch"
          type="text"
          className="my-4 w-100 form-control-plaintext border-success border-top-0"
          placeholder="Search product"
        />
      </div>
      <div className="row gy-4 mt-5">
        {searchedArr.length
          ? searchedArr.map((prod) => <Product key={prod._id} prod={prod} />)
          : data?.map((prod) => <Product key={prod._id} prod={prod} />)}
      </div>
    </Fragment>
  );
}
