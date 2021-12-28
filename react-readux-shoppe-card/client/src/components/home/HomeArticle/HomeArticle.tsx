import React, { useState } from "react";
import "./HomeArticle.scss";
import { Link } from "react-router-dom";
import { numberListFrames } from "../../../redux/types";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import classNames from "classnames";

const HomeArticle: React.FC = () => {
  const [isArrowCarousel, setIsArrowCarousel] = useState<Boolean>(true);
  const handleToggleCarousel = () => {
    setIsArrowCarousel(!isArrowCarousel);
  };

  return (
    <div className="home__article">
      <div className="home__article--banner-image">
        <img src="https://cf.shopee.vn/file/b4b3ae7cd45ce23a678d172112357793" alt="" />
      </div>
      <div className="home__article--category">
        <div className="home__article--category-title">
          <h2>Danh mục</h2>
        </div>
        <button
          onClick={handleToggleCarousel}
          className={classNames("home__article--category-arrow_left", { active: !isArrowCarousel })}
        >
          <BsChevronLeft />
        </button>
        <div className="home__article--category-box">
          <ul className="home__article--category-carousel">
            {numberListFrames.map((lists: any, index: number) => (
              <li key={index} className="home__article--category-carousel_item">
                <Link
                  to="/"
                  className={classNames("home__article--category-carousel_item__frames", {
                    active: !isArrowCarousel,
                  })}
                >
                  <div className={lists.classImageTop}></div>
                  <span>{lists.textTop}</span>
                </Link>
                <Link
                  to="/"
                  className={classNames("home__article--category-carousel_item__frames", {
                    active: !isArrowCarousel,
                  })}
                >
                  <div className={lists.classImageBottom}></div>
                  <span>{lists.textBottom}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleToggleCarousel}
          className={classNames("home__article--category-arrow_right", { active: isArrowCarousel })}
        >
          <BsChevronRight />
        </button>
      </div>
      <div>text</div>
    </div>
  );
};

export default HomeArticle;
