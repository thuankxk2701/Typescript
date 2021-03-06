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
        toast.warn("Vui L??ng Nh???p M???t Kh???u M???i ", {
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
        toast.success("Thay ?????i M???t Kh???u Th??nh C??ng", {
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
        toast.warn("M???t Kh???u Kh??ng Ch??ng Kh???p", {
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
        toast.success("Thay ?????i Email Th??nh C??ng", {
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
        toast.error("Email Kh??ng Ch??nh S??c", {
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
        toast.success("Thay ?????i S??? ??i???n Tho???i Th??nh C??ng", {
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
        toast.error("S??? ??i???n Kh??ng Ch??nh S??c", {
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
            <h4>Th??m M???t Kh???u</h4>
            <p> ????? b???o m???t t??i kho???n, vui l??ng kh??ng chia s??? m???t kh???u cho ng?????i kh??c</p>
          </>
        )}
        {types === "email" && (
          <>
            <h4>Thay ?????i Email</h4>
            <p> ????? b???o m???t t??i kho???n, vui l??ng kh??ng chia s??? email cho ng?????i kh??c</p>
          </>
        )}
        {types === "phone" && (
          <>
            <h4>Thay ?????i S??? Di???n Tho???i</h4>
            <p> ????? b???o m???t t??i kho???n, vui l??ng kh??ng chia s??? s??? ??i???n tho???i cho ng?????i kh??c</p>
          </>
        )}
      </div>
      <form onSubmit={handleConvertSubmit} className="user__description--convert-form">
        {types === "password" && (
          <>
            <div className="user__description--convert-form_new">
              <div className="user__description--convert-form_title">M???t Kh???u M???i</div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChangePassword}
                className="user__description--convert-form_input"
              />
            </div>
            <div className="user__description--convert-form_confluent">
              <div className="user__description--convert-form_title">Nh???p L???i M???t Kh???u</div>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChangePassword}
                className="user__description--convert-form_input"
              />
            </div>
            <button className="user__description--convert-form_button">L??u </button>
          </>
        )}
        {types === "email" && (
          <>
            <div className="user__description--convert-form_new">
              <div className="user__description--convert-form_title">Nh???p Email C?? </div>
              <input
                type="email"
                name="oldEmail"
                value={oldEmail}
                onChange={handleChangeEmail}
                className="user__description--convert-form_input"
              />
            </div>
            <div className="user__description--convert-form_confluent">
              <div className="user__description--convert-form_title">Nh???p Email M???i</div>
              <input
                type="email"
                name="newEmail"
                value={newEmail}
                onChange={handleChangeEmail}
                className="user__description--convert-form_input"
              />
            </div>
            <button className="user__description--convert-form_button">L??u </button>
          </>
        )}
        {types === "phone" && (
          <>
            <div className="user__description--convert-form_new">
              <div className="user__description--convert-form_title">Nh???p S??? ??i???n Tho???i C?? </div>
              <input
                type="text"
                value={oldNumberPhone}
                name="oldNumberPhone"
                onChange={handleChangeNumberPhone}
                className="user__description--convert-form_input"
              />
            </div>
            <div className="user__description--convert-form_confluent">
              <div className="user__description--convert-form_title">Nh???p S??? ??i???n Tho???i M???i</div>
              <input
                type="text"
                name="newNumberPhone"
                value={newNumberPhone}
                onChange={handleChangeNumberPhone}
                className="user__description--convert-form_input"
              />
            </div>
            <button className="user__description--convert-form_button">L??u </button>
          </>
        )}
      </form>
    </div>
  );
};

export default UserPassword;
