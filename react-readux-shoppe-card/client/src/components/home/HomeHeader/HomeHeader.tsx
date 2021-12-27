import React from "react";
import "./HomeHeader.scss";
import Carousels from "../Carousel/Carousels";

const HomeHeader: React.FC = () => {
  return (
    <div className="home__header">
      <div className="home__header--carousel">
        <Carousels />
      </div>
      <div className="home__header--discount-image">
        <img
          src="https://bloggiamgia.vn/wp-content/uploads/2021/08/Shopee-20.8.jpg"
          alt="PhotoImage"
        />
        <img
          src="https://s3-ap-southeast-1.amazonaws.com/storage.adpia.vn/affiliate_document/multi/tin-khuyen-mai-shopee-1212.jpg"
          alt="PhotoImage"
        />
      </div>
      <div className="home__header--list-products">
        <a href="#1" className="home__header--list-products_item">
          <div className="home__header--list-products_item__image-1"></div>
          <div className="home__header--list-products_item__text">
            Tech Zone - Siêu thị <p>Điện tử</p>
          </div>
        </a>
        <a href="#1" className="home__header--list-products_item">
          <div className="home__header--list-products_item__image-2"></div>
          <div className="home__header--list-products_item__text">Gì Cũng Rẻ - Từ 1K</div>
        </a>
        <a href="#1" className="home__header--list-products_item">
          <div className="home__header--list-products_item__image-3"></div>
          <div className="home__header--list-products_item__text">
            Hoàn Xu 20% - Đơn Từ <p>OĐ</p>
          </div>
        </a>
        <a href="#1" className="home__header--list-products_item">
          <div className="home__header--list-products_item__image-4"></div>
          <div className="home__header--list-products_item__text">
            Nạp Thẻ,Hóa Đơn & E- <p>Voucher</p>
          </div>
        </a>
        <a href="#1" className="home__header--list-products_item">
          <div className="home__header--list-products_item__image-5"></div>
          <div className="home__header--list-products_item__text"> Freeship Xtra Đến 70K</div>
        </a>
        <a href="#1" className="home__header--list-products_item">
          <div className="home__header--list-products_item__image-6"></div>
          <div className="home__header--list-products_item__text">
            Hàng Hiệu 50% - <p>Voucher 50%</p>
          </div>
        </a>
        <a href="#1" className="home__header--list-products_item">
          <div className="home__header--list-products_item__image-7"></div>
          <div className="home__header--list-products_item__text">
            Hàng Quốc Tế - Freeship <p>0Đ</p>
          </div>
        </a>
        <a href="#1" className="home__header--list-products_item">
          <div className="home__header--list-products_item__image-8"></div>
          <div className="home__header--list-products_item__text">Shopee Premium</div>
        </a>
      </div>
    </div>
  );
};

export default HomeHeader;
