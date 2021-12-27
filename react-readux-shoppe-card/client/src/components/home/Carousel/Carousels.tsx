import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import "./Carousel.scss";

const Carousels: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <div className="carousel__box">
      {" "}
      <Slider {...settings}>
        <div className="carousel__box--image">
          <img
            src="https://a.ipricegroup.com/media/Duy/shopee1111.2020/sieu_sale_1111_4.png"
            alt="Photo1"
          />
        </div>
        <div className="carousel__box--image">
          <img
            src="https://a.ipricegroup.com/trends-article/shopee-1111-sieu-sale-va-11-dieu-khong-the-bo-lo-medium.jpg"
            alt="Photo2"
          />
        </div>
        <div className="carousel__box--image">
          <img
            src="https://bloggiamgia.vn/wp-content/uploads/2021/08/Shopee-20.8.jpg"
            alt="Photo3"
          />
        </div>
        <div className="carousel__box--image">
          <img src="https://jmb.com.vn/wp-content/uploads/2020/12/sp3.jpg" alt="photo4" />
        </div>
        <div className="carousel__box--image">
          <img
            src="https://s3-ap-southeast-1.amazonaws.com/storage.adpia.vn/affiliate_document/multi/tin-khuyen-mai-shopee-1212.jpg"
            alt="Photo5"
          />
        </div>
        <div className="carousel__box--image">
          <img
            src="https://eadm2t8zq4a.exactdn.com/wp-content/uploads/2021/06/shopee-15.6.jpg?strip=all&lossy=0&resize=608%2C292&ssl=1"
            alt="photo6"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousels;
