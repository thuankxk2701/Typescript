import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import { AiFillApple } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

import { getUser } from "../../redux/reducer";
import { toast } from "react-toastify";

interface loginMainProps {
  types: string;
}

const LoginMain: React.FC<loginMainProps> = ({ types }) => {
  const users = useAppSelector(state => state.usersReducer.users);
  const history = useHistory();
  const [nameSignIn, setNameSignIn] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const handleNameSignIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameSignIn(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handSubmitSignIn = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nameSignIn.trim() === "") {
      toast.warn("Vui Lòng Nhập Tài Khoản", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (password.trim() === "") {
      toast.warn("Vui Lòng Nhập Mật Khẩu", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const account = users.find(user => {
      if (user.profile.password === password && user.profile.nameSignIn === nameSignIn) {
        return true;
      } else {
        return false;
      }
    });
    if (!account) {
      toast.error("Vui Lòng Kiểm Tra Tài Khoản Hoặc Mật Khẩu", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (nameSignIn.trim() !== "" && password.trim() !== "")
      dispatch(getUser({ nameSignIn: nameSignIn, password: password }));

    history.push("/");
  };

  return (
    <div className="login__main">
      <div className="login__main--left">
        <FiShoppingCart className="login__main--left-logo" />
        <h1 className="login__main--left-text__header">Shopping</h1>
        <span className="login__main--left-text__description">
          Nền tảng thương mại điện tử yêu thich ở Đông Nam Á & Đài Loan
        </span>
      </div>

      <div className="login__main--right">
        <form onSubmit={handSubmitSignIn} className="login__main--right-form">
          {types === "SignIn" && (
            <>
              <h4 className="login__main--right-login">{types}</h4>
              <input
                onChange={handleNameSignIn}
                type="text"
                placeholder="Email/NumberPhone"
                className="login__main--right-input_account"
                value={nameSignIn}
              />
              <input
                name={password}
                type="password"
                placeholder="Password"
                className="login__main--right-input_password"
                onChange={handlePassword}
              />
              <button className="login__main--right-next">{types}</button>
              <div className="login__main--right-support">
                <a href="#1">Quên mật khẩu</a>
                <a href="#1">Đăng nhập với SMS</a>
              </div>
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

              <div className="login__main--right-footer">
                <span className="login__main--right-footer_text">Bạn mới biết đến Shopee?</span>
                <Link to="/signUp" className="login__main--right-footer_switch link">
                  SingUp
                </Link>
              </div>
            </>
          )}
          {types === "SignUp" && (
            <>
              <h4 className="login__main--right-login">{types}</h4>
              <input
                type="text"
                placeholder="Number Phone"
                className="login__main--right-input_account"
              />

              <button className="login__main--right-next">{types}</button>
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
                <span className="login__main--right-footer_text">Bạn đã có tài khoản?</span>
                <Link to="/signIn" className="login__main--right-footer_switch link">
                  SingIn
                </Link>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginMain;
