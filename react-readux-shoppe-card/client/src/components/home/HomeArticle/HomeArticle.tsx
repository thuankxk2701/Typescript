import React from "react";
import "./HomeArticle.scss";

const HomeArticle: React.FC = () => {
  return (
    <div className="home__article">
      <div className="home__article--banner-image">
        <img src="https://cf.shopee.vn/file/b4b3ae7cd45ce23a678d172112357793" alt="" />
      </div>
      <div className="category"></div>
    </div>
  );
};

export default HomeArticle;
