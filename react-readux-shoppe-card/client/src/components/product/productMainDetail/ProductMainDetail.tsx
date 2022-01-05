import React from "react";
import { BsStarFill } from "react-icons/bs";
import "./ProductMainDetail.scss";

interface typeProductDetailProps {
  types: string[];
  title: string;
  price: number[];
  favorite: boolean;
  rating: number;
  peopleRate: number;
  peopleBought: number;
  quantity: number;
  discount: number;
}
const ProductMainDetail: React.FC<typeProductDetailProps> = ({
  discount,
  types,
  title,
  price,
  favorite,
  rating,
  peopleRate,
  peopleBought,
  quantity,
}) => {
  console.log(types, title, price, favorite, rating, peopleRate, peopleBought, quantity);
  let listRating = [];
  for (let i = 0; i < Math.ceil(rating); i++) {
    listRating.push(i);
  }
  return (
    <>
      <div className="product__main--detail-content">
        <div className="product__main--detail-content_header">
          {favorite && (
            <span className="product__main--detail-content_header__favorite">Yêu thích</span>
          )}
          {title}
        </div>
        <div className="product__main--detail-content_rate">
          <div className="product__main--detail-content_rate__star">
            <span> {rating + ".0"}</span>
            <BsStarFill className="icon" />
            <BsStarFill className="icon" />
            <BsStarFill className="icon" />
            <BsStarFill className="icon" />
            <BsStarFill className="icon" />
          </div>
          <div className="product__main--detail-content_rate__people-rate">
            <span className="product__main--detail-content_rate__people-rate--amount">
              {peopleRate / 1000}K
            </span>
            <span className="product__main--detail-content_rate__people-rate--text"> Đánh giá</span>
          </div>
          <div className="product__main--detail-content_rate__people-buy">
            <span className="product__main--detail-content_rate__people-buy--amount">
              {peopleBought / 1000}K
            </span>
            <span className="product__main--detail-content_rate__people-buy--text">Đã bán</span>
          </div>
        </div>
        <div className="product__main--detail-content_post">
          <div className="product__main--detail-content_post__box">
            <div className="product__main--detail-content_post__box-price">
              <div className="product__main--detail-content_post__box-price--init">
                <span className='"product__main--detail-content_post__box-price--init_first'>
                  {price[0] + "đ"}
                </span>
                -
                <span className='"product__main--detail-content_post__box-price--init_last'>
                  {price[price.length - 1] + "đ"}
                </span>
              </div>
              <div className="product__main--detail-content_post__box-price--shell">
                <span className='"product__main--detail-content_post__box-price--shell_first'>
                  {price[0] + "đ"}
                </span>
                -
                <span className='"product__main--detail-content_post__box-price--shell_last'>
                  {price[price.length - 1] + "đ"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form className="product__main--detail-form"></form>
    </>
  );
};

export default ProductMainDetail;
