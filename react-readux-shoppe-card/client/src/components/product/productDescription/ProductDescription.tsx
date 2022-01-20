import React from "react";

import "./ProductDescription.scss";

interface productDescriptionProps {
  category: string[];
  heightSkirt: string;
  season: string;
  sendAddress: string;
  style: string;
  substance: string;
  typeSkirt: string;
  waitVersion: string;
  productDescription: string;
}
const ProductDescription: React.FC<productDescriptionProps> = ({
  category,
  heightSkirt,
  season,
  sendAddress,
  style,
  substance,
  typeSkirt,
  waitVersion,
  productDescription,
}) => {
  return (
    <>
      <div className="description__heading">Chi tiết sản phẩm</div>
      <div className="description__box">
        <div className="description__box--title">Danh Mục</div>
        <div className="description__box--content">
          {category.map((ctg, index) => (
            <div key={index}>{ctg}</div>
          ))}
        </div>
      </div>
      <div className="description__box">
        <div className="description__box--title">Mùa</div>
        <div className="description__box--content">{season}</div>
      </div>
      <div className="description__box">
        <div className="description__box--title">Phong cách</div>
        <div className="description__box--content">{style}</div>
      </div>
      <div className="description__box">
        <div className="description__box--title">Bản eo</div>
        <div className="description__box--content">{waitVersion}</div>
      </div>
      <div className="description__box">
        <div className="description__box--title">Kiểu váy</div>
        <div className="description__box--content">{typeSkirt}</div>
      </div>
      <div className="description__box">
        <div className="description__box--title">Chất liệu</div>
        <div className="description__box--content">{substance}</div>
      </div>
      <div className="description__box">
        <div className="description__box--title">Chiều dài váy</div>
        <div className="description__box--content">{heightSkirt}</div>
      </div>
      <div className="description__box">
        <div className="description__box--title">Gửi từ</div>
        <div className="description__box--content">{sendAddress}</div>
      </div>
      <div className="description__heading mb-medium">Mô Tả Sản Phẩm</div>
      <div className="description__box"> Đang {productDescription}</div>
    </>
  );
};

export default ProductDescription;
