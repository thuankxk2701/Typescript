import React, { useEffect } from "react";
import axios from "axios";
import Posts from "../Posts/Posts";

const Home: React.FC = () => {
  useEffect(() => {
    const data: any = axios.get("https://json-server-todo-demo.herokuapp.com/api/data");
    console.log(data);
  }, []);
  return (
    <div className="container">
      <div className="py-4">
        <Posts />
      </div>
    </div>
  );
};

export default Home;
