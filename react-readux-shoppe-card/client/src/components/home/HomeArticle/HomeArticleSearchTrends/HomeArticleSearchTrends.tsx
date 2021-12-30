import React from "react";
import "./HomeArticleSearchTrends.scss";
import { Link } from "react-router-dom";

const HomeArticleSearchTrends: React.FC = () => {
  return (
    <div className="home__article--search-trends">
      <div className="home__article--search-trends_title">
        <h3>XU HƯỚNG TÌM KIẾM</h3>
        <span>Xem Thêm</span>
      </div>
      <div className="home__article--search-trends_content">
        <ul className="home__article--search-trends_content__lists">
          <li className="home__article--search-trends_content__list">
            <Link to="/">
              <div className="home__article--search-trends_content__list-text">
                <h3>Kính</h3>
                <span>2tr + sản phẩm</span>
              </div>
              <img
                className="home__article--search-trends_content__list-image"
                src="https://cf.shopee.vn/file/816fede0dc1d356fe7c6b44d9226482f"
                alt="Glasses"
              ></img>
            </Link>
          </li>

          <li className="home__article--search-trends_content__list">
            <Link to="/">
              <div className="home__article--search-trends_content__list-text">
                <h3>Mũ Bảo Hiểm</h3>
                <span>144k + sản phẩm</span>
              </div>
              <img
                className="home__article--search-trends_content__list-image"
                src="https://cf.shopee.vn/file/892e32c3d4cedcb3cfbd93060f3691b4"
                alt="Hat"
              ></img>
            </Link>
          </li>

          <li className="home__article--search-trends_content__list">
            <Link to="/">
              <div className="home__article--search-trends_content__list-text">
                <h3>Ga Giường</h3>
                <span>318k + sản phẩm</span>
              </div>
              <img
                className="home__article--search-trends_content__list-image"
                src="https://cf.shopee.vn/file/30da4096b54aed6682ea7620168a4a84"
                alt="Bed sheets"
              ></img>
            </Link>
          </li>

          <li className="home__article--search-trends_content__list">
            <Link to="/">
              <div className="home__article--search-trends_content__list-text">
                <h3>Đèn Led Tran..</h3>
                <span>149k + sản phẩm</span>
              </div>
              <img
                className="home__article--search-trends_content__list-image"
                src="https://cf.shopee.vn/file/cc2105acb993d9eb941892fe3d79e91f"
                alt="Glowing"
              ></img>
            </Link>
          </li>

          <li className="home__article--search-trends_content__list">
            <Link to="/">
              <div className="home__article--search-trends_content__list-text">
                <h3>Dây Chuyền</h3>
                <span>560k + sản phẩm</span>
              </div>
              <img
                className="home__article--search-trends_content__list-image"
                src="https://cf.shopee.vn/file/1c02f27a01e560bb17dddb82cceccad0"
                alt="Necklace"
              ></img>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeArticleSearchTrends;
