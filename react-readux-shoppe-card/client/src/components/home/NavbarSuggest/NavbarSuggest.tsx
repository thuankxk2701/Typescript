import React from "react";
import "./NavbarSuggest.scss";

const NavbarSuggest: React.FC = () => {
  return (
    <div className="navbar__suggest">
      <div className="navbar__suggest--title">Gợi ý hôm nay</div>
      <div className="navbar__suggest--context">
        <img
          src="https://cf.shopee.vn/file/328192d9f01ccfb199fa9090321acf96"
          alt="Sale"
          className="navbar__suggest--context-sale"
        ></img>
      </div>
    </div>
  );
};

export default NavbarSuggest;
