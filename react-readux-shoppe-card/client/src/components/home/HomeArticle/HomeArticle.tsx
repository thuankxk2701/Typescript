import React from "react";
import HomeArticleCategory from "./HomeArticleCategory/HomeArticleCategory";
import HomeArticleSimple from "./HomeArticleSimple/HomeArticleSimple";
import "./HomeArticle.scss";

const HomeArticle: React.FC = () => {
  return (
    <div className="home__article">
      <div className="home__article--banner-image">
        <img src="https://cf.shopee.vn/file/b4b3ae7cd45ce23a678d172112357793" alt="" />
      </div>
      <HomeArticleCategory />
      <HomeArticleSimple />
      <div>text</div>
    </div>
  );
};

export default HomeArticle;
