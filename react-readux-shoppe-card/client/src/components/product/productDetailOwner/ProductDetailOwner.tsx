import React from "react";
import { BsFillChatDotsFill, BsShop } from "react-icons/bs";
import "./ProductDetailOwner.scss";

interface productDetailOwnerProps {
  logoUrl: string;
  name: string;
  participation: string;
  peopleFlowing: number;
  product: number;
  rate: number;
  responseRate: number;
  responseTime: string;
  timeActiveAgo: number;
  favorite: boolean;
}

const ProductDetailOwner: React.FC<productDetailOwnerProps> = ({
  logoUrl,
  name,
  participation,
  peopleFlowing,
  product,
  rate,
  responseRate,
  responseTime,
  timeActiveAgo,
  favorite,
}) => {
  return (
    <>
      <div className="owner__heading">
        <div className="owner__heading--information">
          <div className="owner__heading--information-logo">
            <img src={logoUrl} alt="logoShop" />
            {favorite && (
              <span className="owner__heading--information-logo_favorite">Yêu Thích</span>
            )}
          </div>
          <div className="owner__heading--information-detail">
            <div className="owner__heading--information-detail_name">{name}</div>
            <div className="owner__heading--information-detail_time__active">
              Online {timeActiveAgo} Phút Trước
            </div>
            <div className="owner__heading--information-detail_exchange">
              <div className="owner__heading--information-detail_exchange__chat">
                <BsFillChatDotsFill className="icon" />
                Chat Ngay
              </div>
              <div className="owner__heading--information-detail_exchange__shop">
                <BsShop className="icon" />
                Xem Shop
              </div>
            </div>
          </div>
        </div>

        <div className="owner__heading--rating">
          <div className="owner__heading--rating-general">
            Đánh giá
            <span> {rate / 1000}k</span>
          </div>
          <div className="owner__heading--rating-general">
            Tỉ Lệ Phản Hồi
            <span> {responseRate}%</span>
          </div>
          <div className="owner__heading--rating-general">
            Tham Gia
            <span> {participation}</span>
          </div>
          <div className="owner__heading--rating-general">
            Sản Phẩm
            <span> {product}</span>
          </div>
          <div className="owner__heading--rating-general">
            Thời Gian Phản Hồi
            <span> {responseTime}</span>
          </div>
          <div className="owner__heading--rating-general">
            Người Theo Dõi
            <span> {peopleFlowing / 1000}k</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailOwner;
