import React from "react";
import Navbar from "../navbar/Navbar";
import Search from "../navbar/Search";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="grid">
        <Navbar />
        <Search />
      </div>
    </header>
  );
};

export default Header;
