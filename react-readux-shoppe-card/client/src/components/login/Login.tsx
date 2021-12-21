import React from "react";

import { FiShoppingCart } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import { AiFillApple } from "react-icons/ai";
import Logo from "../logo/Logo";
import "./login.scss";

const Login: React.FC = () => {
  return (
    <div className="login__container">
      <div className="login__heading">
        <div className="login__heading--left">
          <Logo fillColor="login__heading--left-background" />
          <span className="login__heading--left-text">Sign in</span>
        </div>
        <div className="login__heading--right">
          <a href="#1" className="login__heading--right-help link">
            Help?
          </a>
        </div>
      </div>

      <div className="login__main">
        <div className="login__main--left">
          <FiShoppingCart className="login__main--left-logo" />
          <h1 className="login__main--left-text__header">Shopping</h1>
          <span className="login__main--left-text__description">
            Nền tảng thương mại điện tử yêu thich ở Đông Nam Á & Đài Loan
          </span>
        </div>
        <div className="login__main--right">
          <form className="login__main--right-form">
            <h4 className="login__main--right-login">SignUp</h4>
            <input
              type="text"
              placeholder="Number Phone"
              className="login__main--right-input_account"
            />
            {/* <input
              type="text"
              placeholder="Number Phone"
              className="login__main--right-input_password"
            /> */}
            <button className="login__main--right-next">Next</button>
            <p className="login__main--right-or">Or</p>
            <div className="login__main--right-box_login">
              <div className="login__main--right-box_login-item facebook">
                <FaFacebook className="login__main--right-box_login-item--icon" />
                <span className="login__main--right-box_login-item--text">Facebook</span>
              </div>
              <div className="login__main--right-box_login-item google">
                <AiFillGoogleCircle className="login__main--right-box_login-item--icon" />
                <span className="login__main--right-box_login-item--text">Google</span>
              </div>
              <div className="login__main--right-box_login-item apple">
                <AiFillApple className="login__main--right-box_login-item--icon" />
                <span className="login__main--right-box_login-item--text">App Store</span>
              </div>
            </div>
            <div className="login__main--right-detail">
              <div className="login__main--right-detail_text">
                Bằng việc đăng kí, bạn đã đồng ý với Shopee về
              </div>
              <div className="login__main--right-detail_box">
                <a href="#1" className=" login__main--right-detail_link link">
                  Điều khoản dịch vụ
                </a>{" "}
                <span>&</span>{" "}
                <a href="#1" className=" login__main--right-detail_link link">
                  Chính sách bảo mật
                </a>
              </div>
            </div>
            <div className="login__main--right-footer">
              <span className="login__main--right-footer_text">Ban da co tai khoan?</span>
              <a href="#1" className="login__main--right-footer_switch link">
                SingIn
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="login__footer">
        <div className="login__footer--customer-care">
          <h1>Cham soc khach hang</h1>
          <ul>
            <li>Trung tam Tro giup</li>
            <li>Trung tam Tro giup</li>
          </ul>
        </div>
        <div className="login__footer--about-shopping"></div>
        <div className="login__footer--payment"></div>
        <div className="login__footer--flowing"></div>
        <div className="login__footer--downloading"></div>
      </div>
    </div>
  );
};

export default Login;
