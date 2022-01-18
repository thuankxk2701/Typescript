import React from "react";
import Navbar from "../home/NavbarHome/Navbar";
import LoginFooter from "../login/LoginFooter";
import { useParams, useHistory, Link } from "react-router-dom";
import { BsPerson, BsPencil, BsCart4 } from "react-icons/bs";
import { useAppSelector } from "../../redux/hook";
import classNames from "classnames";
import { MdOutlineEventNote } from "react-icons/md";
import UserProfile from "./userProfile/UserProfile";
import UserPassword from "./userFormConvert/UserFormConvert";
import UserStore from "./userStore/UserStore";
import "./UserAccount.scss";

const UserAccount: React.FC = () => {
  const user = useAppSelector(state => state.usersReducer.user);

  const { title } = useParams<any>();
  const history = useHistory();

  if (user.profile.nameSignIn === "") {
    history.push("/signIn");
  }

  return (
    <>
      <Navbar />
      <div className="account">
        <div className="user">
          <div className="user__nav">
            <div className="user__nav--profile">
              <div className="user__nav--profile-image">
                <img src={user.profile.urlImage} alt="img" />
              </div>
              <div className="user__nav--profile-detail">
                <div className="user__nav--profile-detail_name">{user.profile.nameSignIn}</div>
                <Link to="/user/account/profile" className="user__nav--profile-detail_link">
                  <BsPencil className="icon" />
                  <span>Sửa Hồ Sơ</span>
                </Link>
              </div>
            </div>
            <div className="user__nav--account">
              <div className="user__nav--account-icon">
                <BsPerson className="icon" />
              </div>
              <div className="user__nav--account-list">
                <ul>
                  <li>
                    <Link to="/user/account/profile">Tài Khoản Của Tôi</Link>
                  </li>
                  <li>
                    <Link
                      to="/user/account/profile"
                      className={classNames({ active: String(title) === "profile" })}
                    >
                      Hồ Sơ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user/account/payment"
                      className={classNames({ active: String(title) === "payment" })}
                    >
                      Ngân Hàng
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user/account/address"
                      className={classNames({ active: String(title) === "address" })}
                    >
                      Địa Chỉ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user/account/password"
                      className={classNames({ active: String(title) === "password" })}
                    >
                      Đổi Mật Khẩu
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="user__nav--purchase">
              <div className="user__nav--purchase-icon">
                <MdOutlineEventNote className="icon" />
              </div>
              <Link
                to="/user/account/purchase"
                className={classNames("user__nav--purchase-link", {
                  active: String(title) === "purchase",
                })}
              >
                Đơn Mua
              </Link>
            </div>
            <div className="user__nav--store">
              <div className="user__nav--store-icon">
                <BsCart4 className="icon" />
              </div>
              <Link
                to="/user/account/store"
                className={classNames("user__nav--store-link", {
                  active: String(title) === "store",
                })}
              >
                Store
              </Link>
            </div>
          </div>
          <div className="user__description">
            {title === "profile" && <UserProfile user={user} />}
            {title === "password" && <UserPassword types={title} user={user} />}
            {title === "email" && <UserPassword types={title} user={user} />}
            {title === "phone" && <UserPassword types={title} user={user} />}
            {title === "store" && <UserStore user={user} />}
          </div>
        </div>
      </div>

      <LoginFooter />
    </>
  );
};

export default UserAccount;
