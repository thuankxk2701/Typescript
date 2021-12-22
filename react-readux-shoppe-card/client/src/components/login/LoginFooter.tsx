import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsApple } from "react-icons/bs";
import { FaGooglePlay } from "react-icons/fa";

const LoginFooter: React.FC = () => {
  return (
    <div className="login__footer">
      <div className="login__footer--items customer__care">
        <h1>CHĂM SÓC KHÁCH HÀNG</h1>
        <ul>
          <li>
            <a href="#1">Trung Tâm Trợ Giúp</a>
          </li>
          <li>
            <a href="#1">Shopee Blog</a>
          </li>
          <li>
            <a href="#1">Shopee Mall</a>
          </li>
          <li>
            <a href="#1">Hướng Dẫn Mua Hàng</a>
          </li>
          <li>
            <a href="#1">Hướng Dẫn Bán Hàng</a>
          </li>
          <li>
            <a href="#1">Thanh Toán</a>
          </li>
          <li>
            <a href="#1">Shopee Xu</a>
          </li>
          <li>
            <a href="#1">Vận Chuyển</a>
          </li>
          <li>
            <a href="#1">Trả Hàng & Hoàn Tiền</a>
          </li>
          <li>
            <a href="#1">Chăm Sóc Khách Hàng</a>
          </li>
          <li>
            <a href="#1">Chính Sách Bảo Hành</a>
          </li>
        </ul>
      </div>
      <div className="login__footer--items about__shopping">
        <h1>VỀ SHOPEE</h1>
        <ul>
          <li>
            <a href="#1">Giới Thiệu Về Shopee Việt Nam</a>
          </li>
          <li>
            <a href="#1">Tuyển Dụng</a>
          </li>
          <li>
            <a href="#1">Điều Khoản Shopee</a>
          </li>
          <li>
            <a href="#1">Chính Sách Bảo Mật</a>
          </li>
          <li>
            <a href="#1">Chính Hãng</a>
          </li>
          <li>
            <a href="#1">Kênh Người Bán</a>
          </li>
          <li>
            <a href="#1">Flash Sales</a>
          </li>
          <li>
            <a href="#1">Vận Chuyển</a>
          </li>
          <li>
            <a href="#1">Chương Trình Tiếp Thị Liên Kết Shopee</a>
          </li>
          <li>
            <a href="#1">Liên Hệ Với Truyền Thông</a>
          </li>
        </ul>
      </div>
      <div className="login__footer--items payment">
        <h1>THANH TOÁN</h1>
        <ul className="payment__lists">
          <li className="payment__lists--visa">
            <div className="payment__lists--visa-image"></div>
          </li>
          <li className="payment__lists--master-card">
            <div className="payment__lists--master-card_image"></div>
          </li>
          <li className="payment__lists--JSB-card">
            <div className="payment__lists--JCB-card_image"></div>
          </li>
          <li className="payment__lists--amex-card">
            <div className="payment__lists--amex-card_image"></div>
          </li>
          <li className="payment__lists--cod-card">
            <div className="payment__lists--cod-card_image"></div>
          </li>
          <li className="payment__lists--installment">
            <div className="payment__lists--installment_image"></div>
          </li>
          <li className="payment__lists--shoppe-pay">
            <div className="payment__lists--shoppe-pay_image"></div>
          </li>
        </ul>
        <h1>ĐƠN VỊ VẬN CHUYỂN</h1>
        <ul className="movement__lists">
          <li className="movement__lists--express">
            <div className="movement__lists--express_image"></div>
          </li>
          <li className="movement__lists--ghtk">
            <div className="movement__lists--ghtk_image"></div>
          </li>
          <li className="movement__lists--ghn">
            <div className="movement__lists--ghn_image"></div>
          </li>
          <li className="movement__lists--viettel-post">
            <div className="movement__lists--viettel-post_image"></div>
          </li>
          <li className="movement__lists--vietnam-post">
            <div className="movement__lists--vietnam-post_image"></div>
          </li>
          <li className="movement__lists--jnt">
            <div className="movement__lists--jnt_image"></div>
          </li>
          <li className="movement__lists--grap">
            <div className="movement__lists--grap_image"></div>
          </li>
          <li className="movement__lists--ninja">
            <div className="movement__lists--ninja_image"></div>
          </li>
          <li className="movement__lists--best">
            <div className="movement__lists--best_image"></div>
          </li>
        </ul>
      </div>
      <div className="login__footer--items flowing">
        <h1>THEO DÕI CHÚNG TÔI TRÊN</h1>
        <ul>
          <li>
            <a href="#1">
              <BsFacebook className="icon" />
              <span>Facebook</span>
            </a>
          </li>
          <li>
            <a href="#1">
              <BsInstagram className="icon" />
              <span>Instagram</span>
            </a>
          </li>
          <li>
            <a href="#1">
              <BsLinkedin className="icon" />
              <span>Linked</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="login__footer--items downloading">
        <h1>TẢI ỨNG DỤNG SHOPEE</h1>
        <ul>
          <li>
            <a href="#1">
              <BsApple className="icon" />
              <span>Apple Store</span>
            </a>
          </li>
          <li>
            <a href="#1">
              <FaGooglePlay className="icon" />
              <span>Google Play</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoginFooter;
