import React from "react";
import Slider from "react-slick";
import axios from "axios";
import { useQuery } from "react-query";

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1500,
    cssEase: "linear",
    arrows: false,
  };

  async function getCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data } = useQuery("getCategories", getCategories);

  return (
    <header>
    
      <div className="row mb-5">
        <Slider {...settings}>
          {data?.data?.data.map((category) => (
            <img
              src={category.image}
              key={category._id}
              className="w-100"
              height={150}
              alt="category"
            />
          ))}
        </Slider>
      </div>
    </header>
  );
}
