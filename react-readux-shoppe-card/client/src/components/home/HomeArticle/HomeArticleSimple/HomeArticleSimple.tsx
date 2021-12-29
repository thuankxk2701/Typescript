import React, { useState } from "react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { numberListSimple } from "../../../../redux/types";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import classNames from "classnames";
import "./HomeArticleSimple.scss";

const HomeArticleSimple: React.FC = () => {
  const [isArrowCarousel, setIsArrowCarousel] = useState<Boolean>(true);
  const handleToggleCarousel = () => {
    setIsArrowCarousel(!isArrowCarousel);
  };
  return (
    <div className="home__article--simple">
      <div className="home__article--simple-title">
        <div className="home__article--simple-title_box">
          <h3 className="home__article--simple-title_box__header">SHOPEE MAIL</h3>
          <div className="home__article--simple-title_box__text">
            <img
              src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/6c502a2641457578b0d5f5153b53dd5d.png"
              alt="PhotoImage"
              className="home__article--simple-title_box__text-image"
            />
            <div className="home__article--simple-title_box__text-content">
              7 Ngày Miễn Phí Trả Hàng
            </div>
          </div>
          <div className="home__article--simple-title_box__text">
            <img
              src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/16ead7e0a68c3cff9f32910e4be08122.png"
              alt="PhotoImage"
              className="home__article--simple-title_box__text-image"
            />
            <div className="home__article--simple-title_box__text-content">
              Hàng Chính Hãng 100%
            </div>
          </div>
          <div className="home__article--simple-title_box__text">
            <img
              src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/511aca04cc3ba9234ab0e4fcf20768a2.png"
              alt="PhotoImage"
              className="home__article--simple-title_box__text-image"
            />
            <div className="home__article--simple-title_box__text-content">Miễn Phí Vận Chuyển</div>
          </div>
        </div>
        <div className="home__article--simple-title_show">
          <div className="home__article--simple-title_show__text">Xem tất cả</div>
          <BsChevronRight className="icon" />
        </div>
      </div>
      <div className="home__article--simple-carousel">
        <div className="home__article--simple-carousel_left">
          <Carousel>
            <Carousel.Item interval={1000}>
              <img
                className="d-block w-100"
                src="https://cf.shopee.vn/file/62f7a4df2de69829c737aed98fd6ae3b"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className="d-block w-100"
                src="https://cf.shopee.vn/file/36ddea7fd2a382e14065a68bd7dd95e4"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className="d-block w-100"
                src="https://cf.shopee.vn/file/cbc254d6fa59d7560944bfeb76c4111a"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="home__article--simple-carousel_right">
          <button
            onClick={handleToggleCarousel}
            className={classNames("home__article--simple-carousel_right__arrow-left", {
              active: !isArrowCarousel,
            })}
          >
            <BsChevronLeft />
          </button>
          <div className="home__article--simple-carousel_right__box">
            <div className="home__article--simple-carousel_right__scroll">
              <ul className="home__article--simple-carousel_right__scroll-lists">
                {numberListSimple.map((list: any, index: number) => (
                  <li
                    key={index}
                    className="home__article--simple-carousel_right__scroll-lists--item"
                  >
                    <Link
                      to="/"
                      className={classNames(
                        "home__article--simple-carousel_right__scroll-lists--item_frames",
                        {
                          active: !isArrowCarousel,
                        },
                      )}
                    >
                      <div className={list.classImageTop}></div>
                      <span>{list.textTop}</span>
                    </Link>
                    <Link
                      to="/"
                      className={classNames(
                        "home__article--simple-carousel_right__scroll-lists--item_frames",
                        {
                          active: !isArrowCarousel,
                        },
                      )}
                    >
                      <div className={list.classImageBottom}></div>
                      <span>{list.textBottom}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            onClick={handleToggleCarousel}
            className={classNames("home__article--simple-carousel_right__arrow-right", {
              active: isArrowCarousel,
            })}
          >
            <BsChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeArticleSimple;
