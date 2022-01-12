import React, { useState } from "react";
import { typeStateUserProps, updateClient, updateUser } from "../../../redux/reducer";
import { useAppDispatch } from "../../../redux/hook";
import "./UserFormConvert.scss";
import { useHistory } from "react-router-dom";

interface userProfileProps {
  user: typeStateUserProps;
  types: string;
}

const UserPassword: React.FC<userProfileProps> = ({ types, user }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [inputFirst, setInputFirst] = useState<string>("");
  const [inputSecond, setInputSecond] = useState<string>("");
  const handleConvertSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (types === "password") {
      if (inputFirst === inputSecond) {
        dispatch(
          updateUser({
            profile: {
              ...user.profile,
              password: inputSecond,
            },
            stores: user.stores,
          }),
        );
        dispatch(updateClient({ nameSignIn: user.profile.nameSignIn }));
        history.push("/user/account/profile");
      }
    }
    if (types === "email") {
      if (inputFirst === user.profile.email) {
        dispatch(
          updateUser({
            profile: {
              ...user.profile,
              email: inputSecond,
            },
            stores: user.stores,
          }),
        );
        dispatch(updateClient({ nameSignIn: user.profile.nameSignIn }));
        history.push("/user/account/profile");
      }
    }
    if (types === "phone") {
      if (inputFirst === user.profile.numberPhone) {
        dispatch(
          updateUser({
            profile: {
              ...user.profile,
              numberPhone: inputSecond,
            },
            stores: user.stores,
          }),
        );
        dispatch(updateClient({ nameSignIn: user.profile.nameSignIn }));
        history.push("/user/account/profile");
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
                value={inputFirst}
                onChange={e => setInputFirst(e.target.value)}
                className="user__description--convert-form_input"
              />
            </div>
            <div className="user__description--convert-form_confluent">
              <div className="user__description--convert-form_title">Nhập Lại Mật Khẩu</div>
              <input
                type="password"
                value={inputSecond}
                onChange={e => setInputSecond(e.target.value)}
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
                value={inputFirst}
                onChange={e => setInputFirst(e.target.value)}
                className="user__description--convert-form_input"
              />
            </div>
            <div className="user__description--convert-form_confluent">
              <div className="user__description--convert-form_title">Nhập Email Mới</div>
              <input
                type="email"
                value={inputSecond}
                onChange={e => setInputSecond(e.target.value)}
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
                value={inputFirst}
                onChange={e => setInputFirst(e.target.value)}
                className="user__description--convert-form_input"
              />
            </div>
            <div className="user__description--convert-form_confluent">
              <div className="user__description--convert-form_title">Nhập Số Điện Thoại Mới</div>
              <input
                type="text"
                value={inputSecond}
                onChange={e => setInputSecond(e.target.value)}
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
