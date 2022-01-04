import React from "react";
import "./Navbar.scss";
import { BsFacebook, BsInstagram, BsGlobe2 } from "react-icons/bs";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { Link } from "react-router-dom";
import product1 from "../../../assets/image/product1.jpg";
import Logo from "../../logo/Logo";
const Navbar: React.FC = () => {
  return (
    <nav className="navbar__home">
      <div className="navbar__home--header">
        <div className="navbar__home--header-box_left">
          <ul>
            <li>Kênh Người Bán</li>
            <li>Trở thành Người bán Shopee</li>
            <li>Tải ứng dụng</li>
            <li>Kết nối</li>
            <li>
              <BsFacebook className="icon" />
            </li>
            <li>
              <BsInstagram className="icon" />
            </li>
          </ul>
        </div>
        <div className="navbar__home--header-box_right">
          <ul>
            <li>
              <MdOutlineNotificationsActive className="icon" />
              <span>Thông Báo</span>
            </li>
            <li>
              <BiHelpCircle className="icon" />
              <span>Hỗ Trợ</span>
            </li>
            <li>
              <BsGlobe2 className="icon" />
              <span>Tiếng Việt</span>
            </li>

            <li>
              <Link to="/SignUp" className="link">
                Đăng Ký
              </Link>
            </li>
            <li>
              <Link to="/SignIn" className="link">
                Đăng Nhập
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar__home--footer">
        <Link to="/" className="navbar__home--footer-logo">
          <Logo className="icon" />
        </Link>
        <div className="navbar__home--footer-search">
          <div className="navbar__home--footer-search_input">
            <input type="text" placeholder="Search Production" />
            <button>
              <FaSearch className="icon" />
            </button>
          </div>
          <div className="navbar__home--footer-search_text">
            <ul>
              <li>
                <a href="#1">Ga Giường</a>
              </li>
              <li>
                <a href="#1">Balo</a>
              </li>
              <li>
                {" "}
                <a href="#1">Sữa Rửa Mặt</a>
              </li>
              <li>
                {" "}
                <a href="#1">Sweater</a>
              </li>
              <li>
                <a href="#1">Dép Bánh Mỳ</a>
              </li>
              <li>
                <a href="#1">Váy Trắng</a>
              </li>
              <li>
                <a href="#1">Áo Cardigan</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar__home--footer-store">
          <div className="navbar__home--footer-store_box">
            <MdOutlineLocalGroceryStore className="icon" />
            {/* <div className="navbar__home--footer-store_box__products no__product"></div> */}
            <div className="navbar__home--footer-store_box__products list__product">
              <ul>
                <li>
                  <a href="#1">
                    <img src={product1} alt="Product1" />
                    <span>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem minima quo
                      aliquam. Dolorem alias quaerat consectetur inventore natus. Beatae optio cum
                      modi placeat expedita voluptates? Amet quae temporibus repellat possimus?
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
