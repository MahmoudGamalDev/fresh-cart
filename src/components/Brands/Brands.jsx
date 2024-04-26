import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";

export default function Brands() {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, refetch } = useQuery("brands", getBrands, {
    select: (data) => data?.data?.data,
    enabled: false,
  });

  console.log(data);

  return (
    <div className="container">
    <Helmet>
        <title>Brands</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
      <h3
        className="mainColor cursor-pointer mt-3"
        onClick={() => {
          refetch();
        }}
      >
        Show Brands
      </h3>
      <div className="row">
        {data?.map((brand) => (
          <div className="brand col-md-2" key={brand._id}>
            <img className="w-100" src={brand.image} alt={brand.title} />
            <p>{brand.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
