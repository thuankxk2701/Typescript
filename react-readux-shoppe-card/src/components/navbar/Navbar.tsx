import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsBellFill } from "react-icons/bs";
import { FiHelpCircle } from "react-icons/fi";
import qrCode from "../../assets/image/qr_code.png";
import appGoogle from "../../assets/image/google.png";
import appStore from "../../assets/image/app_store.png";

const Navbar: React.FC = () => {
  return (
    <nav className="header__navbar">
      <ul className="header__navbar-list">
        <li className="header__navbar-item header__navbar-item--separate header__navbar-item--has-qr ">
          Vào của hàng shoppe
          <div className="header__qr">
            <img src={qrCode} alt="QR code" className="header__qr-img" />
            <div className="header__qr-apps">
              <a href="" className="header__qr-link">
                <img src={appStore} alt="App Store" className="header__qr-download-img" />
              </a>
              <a href="" className="header__qr-link">
                <img src={appGoogle} alt="App Google" className="header__qr-download-img" />
              </a>
            </div>
          </div>
        </li>
        <li className="header__navbar-item">
          <span className="header__navbar-title--no-pointer"> Kết nối</span>

          <a href="#3" className="header__navbar-icon-link">
            <FaFacebook className="header__navbar-icon" />
          </a>
          <a href="#3" className="header__navbar-icon-link">
            <AiOutlineInstagram className="header__navbar-icon" />
          </a>
        </li>
      </ul>
      <ul className="header__navbar-list">
        <li className="header__navbar-item">
          <a href="#1" className="header__navbar-item-link">
            <BsBellFill className="header__navbar-icon" />
            Thông báo
          </a>
        </li>
        <li className="header__navbar-item">
          <a href="#2" className="header__navbar-item-link">
            <FiHelpCircle className="header__navbar-icon" />
            Trợ giúp
          </a>
        </li>
        <li
          className="header__navbar-item header__navbar-item--strong 
header__navbar-item--separate"
        >
          Đăng kí
        </li>
        <li className="header__navbar-item header__navbar-item--strong">Đăng nhập</li>
      </ul>
    </nav>
  );
};

export default Navbar;
