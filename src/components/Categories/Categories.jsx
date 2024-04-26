import React from "react";
import { Helmet } from "react-helmet";
import CategorySlider from "../CategorySlider/CategorySlider";

export default function Categories() {
  return (
    <div>
      <Helmet>
        <title>Categories</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
    </div>
  );
}
