import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { FiHeart } from "react-icons/fi";
import "./ProductMainCarousel.scss";
interface typeUrlImage {
  listUrlImage: string[];
  numberOfFavorites: number;
}
const ProductMainCarousel: React.FC<typeUrlImage> = ({ listUrlImage, numberOfFavorites }) => {
  console.log(numberOfFavorites / 1000);

  return (
    <>
      <div className="product__main--carousel-slide">
        <Carousel>
          {listUrlImage.map((urlImage, index: number) => (
            <Carousel.Item key={index} interval={1000}>
              <img className="d-block w-100" src={urlImage} alt="First slide" />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="product__main--carousel-commented">
        <div className="product__main--carousel-commented_share">
          <div className="product__main--carousel-commented_share__message"></div>
          <div className="product__main--carousel-commented_share__facebook"></div>
          <div className="product__main--carousel-commented_share__pinter"></div>
          <div className="product__main--carousel-commented_share__twitter"></div>
        </div>
        <div className="product__main--carousel-commented_favorites">
          <div className="product__main--carousel-commented_favorites__icon">
            <FiHeart className="icon" />
          </div>
          <div className="product__main--carousel-commented_favorites__text">
            Đã thích {numberOfFavorites / 1000}K
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductMainCarousel;
