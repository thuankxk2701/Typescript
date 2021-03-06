import React from "react";
import Navbar from "./NavbarHome/Navbar";
import HomeHeader from "./HomeHeader/HomeHeader";
import HomeArticle from "./HomeArticle/HomeArticle";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <HomeHeader />
      <HomeArticle />
    </>
  );
};

export default Home;
