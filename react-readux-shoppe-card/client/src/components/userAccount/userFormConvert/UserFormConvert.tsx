import React, { useState } from "react";
import { typeStateUserProps, updateClient, updateUser } from "../../../redux/reducer";
import { useAppDispatch } from "../../../redux/hook";
import "./UserFormConvert.scss";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

interface userProfileProps {
  user: typeStateUserProps;
  types: string;
}

const UserPassword: React.FC<userProfileProps> = ({ types, user }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [oldNumberPhone, setOldNumberPhone] = useState<string>("");
  const [newNumberPhone, setNewNumberPhone] = useState<string>("");
  const [oldEmail, setOldEmail] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConFirmPassword] = useState<string>("");
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    if (e.target.name === "password") {
      setPassword(password);
    }
    if (e.target.name === "confirmPassword") {
      setConFirmPassword(password);
    }
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (e.target.name === "oldEmail") {
      setOldEmail(email);
    }
    if (e.target.name === "newEmail") {
      setNewEmail(email);
    }
  };
  const handleChangeNumberPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    if (e.target.name === "oldNumberPhone") {
      if (!Number(phone) && phone !== "" && phone !== "0") return;
      if (phone.length <= 11) setOldNumberPhone(phone);
    }
    if (e.target.name === "newNumberPhone") {
      if (!Number(phone) && phone !== "" && phone !== "0") return;
      if (phone.length <= 11) setNewNumberPhone(phone);
    }
  };
  const handleConvertSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (types === "password") {
      if (password.trim() === "") {
        toast.warn("Vui Lòng Nhập Mật Khẩu Mới ", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      if (password === confirmPassword) {
        dispatch(
          updateUser({
            profile: {
              ...user.profile,
              password: password,
            },
            stores: user.stores,
          }),
        );
        dispatch(updateClient({ nameSignIn: user.profile.nameSignIn }));
        toast.success("Thay Đổi Mật Khẩu Thành Công", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          history.push("/user/account/profile");
        }, 1500);
      } else {
        toast.warn("Mật Khẩu Không Chùng Khớp", {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    if (types === "email") {
      if (oldEmail === user.profile.email) {
        dispatch(
          updateUser({
            profile: {
              ...user.profile,
              email: newEmail,
            },
            stores: user.stores,
          }),
        );
        dispatch(updateClient({ nameSignIn: user.profile.nameSignIn }));
        toast.success("Thay Đổi Email Thành Công", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          history.push("/user/account/profile");
        }, 1500);
      } else {
        toast.error("Email Không Chính Sác", {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    if (types === "phone") {
      if (oldNumberPhone === user.profile.numberPhone) {
        dispatch(
          updateUser({
            profile: {
              ...user.profile,
              numberPhone: newNumberPhone,
            },
            stores: user.stores,
          }),
        );
        dispatch(updateClient({ nameSignIn: user.profile.nameSignIn }));
        toast.success("Thay Đổi Số Điện Thoại Thành Công", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          history.push("/user/account/profile");
        }, 1500);
      } else {
        toast.error("Số Điện Không Chính Sác", {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className="user__description--convert">
      <div className="user__description--convert-header">
        {types === "password" && (
          <>
            <h4>Thêm Mật Khẩu</h4>
            <p> Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>
          </>
        )}
        {types === "email" && (
          <>
            <h4>Thay Đổi Email</h4>
            <p> Để bảo mật tài khoản, vui lòng không chia sẻ email cho người khác</p>
          </>
        )}
        {types === "phone" && (
          <>
            <h4>Thay Đổi Số Diện Thoại</h4>
            <p> Để bảo mật tài khoản, vui lòng không chia sẻ số điện thoại cho người khác</p>
          </>
        )}
      </div>
      <form onSubmit={handleConvertSubmit} className="user__description--convert-form">
        {types === "password" && (
          <>
            <div className="user__description--convert-form_new">
              <div className="user__description--convert-form_title">Mật Khẩu Mới</div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChangePassword}
                className="user__description--convert-form_input"
              />
            </div>
            <div className="user__description--convert-form_confluent">
              <div className="user__description--convert-form_title">Nhập Lại Mật Khẩu</div>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChangePassword}
                className="user__description--convert-form_input"
              />
            </div>
            <button className="user__description--convert-form_button">Lưu </button>
          </>
        )}
        {types === "email" && (
          <>
            <div className="user__description--convert-form_new">
              <div className="user__description--convert-form_title">Nhập Email Cũ </div>
              <input
                type="email"
                name="oldEmail"
                value={oldEmail}
                onChange={handleChangeEmail}
                className="user__description--convert-form_input"
              />
            </div>
            <div className="user__description--convert-form_confluent">
              <div className="user__description--convert-form_title">Nhập Email Mới</div>
              <input
                type="email"
                name="newEmail"
                value={newEmail}
                onChange={handleChangeEmail}
                className="user__description--convert-form_input"
              />
            </div>
            <button className="user__description--convert-form_button">Lưu </button>
          </>
        )}
        {types === "phone" && (
          <>
            <div className="user__description--convert-form_new">
              <div className="user__description--convert-form_title">Nhập Số Điện Thoại Cũ </div>
              <input
                type="text"
                value={oldNumberPhone}
                name="oldNumberPhone"
                onChange={handleChangeNumberPhone}
                className="user__description--convert-form_input"
              />
            </div>
            <div className="user__description--convert-form_confluent">
              <div className="user__description--convert-form_title">Nhập Số Điện Thoại Mới</div>
              <input
                type="text"
                name="newNumberPhone"
                value={newNumberPhone}
                onChange={handleChangeNumberPhone}
                className="user__description--convert-form_input"
              />
            </div>
            <button className="user__description--convert-form_button">Lưu </button>
          </>
        )}
      </form>
    </div>
  );
};

export default UserPassword;
