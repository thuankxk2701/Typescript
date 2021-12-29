import React, { useState } from "react";
import { Link } from "react-router-dom";
import { numberListFrames } from "../../../../redux/types";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import classNames from "classnames";
import "./HomeArticleCategory.scss";

const HomeArticleCategory: React.FC = () => {
  const [isArrowCarousel, setIsArrowCarousel] = useState<Boolean>(true);
  const handleToggleCarousel = () => {
    setIsArrowCarousel(!isArrowCarousel);
  };

  return (
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
          {numberListFrames.map((list: any, index: number) => (
            <li key={index} className="home__article--category-carousel_item">
              <Link
                to="/"
                className={classNames("home__article--category-carousel_item__frames", {
                  active: !isArrowCarousel,
                })}
              >
                <div className={list.classImageTop}></div>
                <span>{list.textTop}</span>
              </Link>
              <Link
                to="/"
                className={classNames("home__article--category-carousel_item__frames", {
                  active: !isArrowCarousel,
                })}
              >
                <div className={list.classImageBottom}></div>
                <span>{list.textBottom}</span>
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
  );
};

export default HomeArticleCategory;
