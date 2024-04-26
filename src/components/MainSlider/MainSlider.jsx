import React from "react";
import slide1 from "../../assets/imgs/slider-image-1.jpeg";
import slide2 from "../../assets/imgs/slider-image-2.jpeg";
import slide3 from "../../assets/imgs/slider-image-3.jpeg";
import blog1 from "../../assets/imgs/blog-img-1.jpeg";
import blog2 from "../../assets/imgs/blog-img-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
  };
  return (
    <header>
      <div className="row mb-5 gx-0">
        <div className="col-md-9">
          <Slider {...settings}>
            <img src={slide1} height={400} alt="pack of greens and fruits" />
            <img src={slide2} height={400} alt="chocolate sticks" />
            <img src={slide3} height={400} alt="cookies" />
          </Slider>
        </div>
        <div className="col-md-3 d-none d-md-block">
          <img
            src={blog1}
            height={200}
            className="w-100"
            alt="greens and eggs"
          />
          <img
            src={blog2}
            height={200}
            className="w-100"
            alt="strawberry and bread"
          />
        </div>
      </div>
    </header>
  );
}
