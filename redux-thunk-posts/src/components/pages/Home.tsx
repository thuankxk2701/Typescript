import React from "react";
import Posts from "../Posts/Posts";

const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="py-4">
        <Posts />
      </div>
    </div>
  );
};

export default Home;
