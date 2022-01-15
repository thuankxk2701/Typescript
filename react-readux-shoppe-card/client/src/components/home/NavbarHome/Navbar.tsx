import React from "react";
import { BsFacebook, BsInstagram, BsGlobe2 } from "react-icons/bs";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { updateUser, updateProductUser } from "../../../redux/reducer";
import "./Navbar.scss";
import Logo from "../../logo/Logo";
const Navbar: React.FC = () => {
  const user = useAppSelector(state => state.usersReducer.user);
  const productUser = useAppSelector(state => state.productsReducer.productUser);

  const dispatch = useAppDispatch();

  const handleSubmitSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateUser({
        profile: {
          nameSignIn: "",
          name: "",
          email: "",
          numberPhone: "",
          nameShop: "",
          sex: "",
          birth: "",
          password: "",
          address: "",
          urlImage: "",
        },
        stores: [],
      }),
    );
    dispatch(updateProductUser([]));
  };

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
            {!user.profile.nameSignIn && (
              <>
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
              </>
            )}
            {user.profile.nameSignIn && (
              <li className="navbar__home--header-box_right__user">
                <div className="navbar__home--header-box_right__box">
                  <img
                    src={user.profile.urlImage}
                    alt="img"
                    className="navbar__home--header-box_right__image"
                  />
                  <span className="navbar__home--header-box_right__name">
                    {user.profile.nameSignIn}
                  </span>
                  <form
                    onSubmit={handleSubmitSignUp}
                    className="navbar__home--header-box_right__switch"
                  >
                    <Link
                      to="/user/account/profile"
                      className="navbar__home--header-box_right__switch-account"
                    >
                      Tài khoản của tôi
                    </Link>
                    <Link
                      to="/user/account/purchase"
                      className="navbar__home--header-box_right__switch-store"
                    >
                      Đơn Mua
                    </Link>
                    <button
                      onSubmit={handleSubmitSignUp}
                      className="navbar__home--header-box_right__switch-sign--out"
                    >
                      Đăng xuất
                    </button>
                  </form>
                </div>
              </li>
            )}
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
            {productUser.length === 0 && (
              <div className="navbar__home--footer-store_box__products no__product"></div>
            )}
            {productUser.length !== 0 && (
              <>
                <div className="navbar__home--footer-store_box__products list__product">
                  <div className="navbar__home--footer-store_box__products-title">
                    Sản Phẩm Mới Thêm
                  </div>
                  <ul>
                    {productUser.map((product, index) => (
                      <li key={index}>
                        <img
                          src={product.listUrlImage[product.listUrlImage.length - 1]}
                          alt="images"
                        />
                        <span>
                          {" "}
                          {product.title
                            .split(" ")
                            .map((str: string, index: number) => {
                              if (index >= 9) {
                                return "";
                              } else return str;
                            })
                            .join(" ") + ". . ."}
                        </span>
                        <div className="navbar__home--footer-store_box__products-price">
                          {String(
                            product.price[product.sizes.indexOf(user.stores[index].size)] *
                              ((100 - product.discount) / 100) -
                              0.001,
                          )
                            .split(".")
                            .map((str: string, index: number) => {
                              if (index === 1) {
                                return str.padEnd(3, "0");
                              } else {
                                let result = "";
                                let i = str.length;
                                let placement = 0;
                                while (i !== 0) {
                                  i--;
                                  if (placement % 3 === 0 && placement !== 0) {
                                    result = str[i] + "," + result;
                                  } else result = str[i] + result;
                                  placement++;
                                }
                                return result;
                              }
                            })
                            .join(".") + " đ"}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/user/account/store"
                    className="navbar__home--footer-store_box__products-switch"
                  >
                    Xem Giỏ Hàng
                  </Link>
                </div>
                <div className="navbar__home--footer-store_box__products-quantity">
                  {productUser.length}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
