import React from "react";
import Logo from "./Logo";
import { BsCartDash } from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import noCard from "../../assets/image/no_card.png";

const Search: React.FC = () => {
  return (
    <div className="header__with-search">
      <div className="header__logo">
        <Logo />
      </div>
      <div className="header__search">
        <input type="text" className="header__search-input" placeholder="Search" />
        <button className="header__search-btn">
          <BiSearchAlt2 className="header__search-btn-icon" />
        </button>
      </div>
      <div className="header__cart">
        <div className="header__cart-wrap">
          <BsCartDash className="header__cart-icon" />

          <span className="header__cart-notice">3</span>
          {/* No cart header__cart-list--no-cart */}
          <div className="header__cart-list">
            <img src={noCard} alt="NoCart" className="header__cart-no-cart-img" />
            <span className="header__cart-list-no-cart-msg">chua co san phan</span>
            <h4 className="header__cart_heading">San pham da them</h4>
            <ul className="header__cart-list-item">
              <li className="header__cart-item"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
