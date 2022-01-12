import React, { useState } from "react";
import { typeStateUserProps } from "../../../redux/reducer";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { ListDay, ListMonth, ListYears } from "../../../redux/types";
import { updateClient } from "../../../redux/reducer";
import { useAppDispatch } from "../../../redux/hook";
import "./UserProfile.scss";
interface userProfileProrps {
  user: typeStateUserProps;
}

const UserProfile: React.FC<userProfileProrps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [nameUser, setNameUser] = useState<string>(user.profile.name);
  const [nameShope, setNameShope] = useState<string>(user.profile.nameShop);
  const [sex, setSex] = useState<string>(user.profile.sex);
  const placementSetSex = 1;
  const [dateBirth, monthBirth, yearsBirth] = user.profile.birth.split("-");
  const [date, setDate] = useState<string>(dateBirth);
  const [month, setMonth] = useState<string>(monthBirth);
  const [years, setYears] = useState<string>(yearsBirth);
  const [urlImage, setUrlImage] = useState<string>(user.profile.urlImage);

  const handleUpdateUser = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateClient({
        profile: {
          nameSignIn: user.profile.nameSignIn,
          name: nameUser,
          email: user.profile.email,
          numberPhone: user.profile.numberPhone,
          nameShop: nameShope,
          sex: sex,
          birth: [date, month, years].join("-"),
          password: user.profile.password,
          address: user.profile.address,
          urlImage: urlImage,
        },
        stores: user.stores,
      }),
    );
  };

  return (
    <div className="user__description--profile">
      <div className="user__description--profile_contain">
        <div className="user__description--profile_contain__brief">Hồ Sơ Của Tôi</div>
        <div className="user__description--profile_contain__manage">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <div className="user__description--profile_change">
        <form onSubmit={handleUpdateUser} className="user__description--profile_change__form">
          <div className="form__name--sign">
            <div className="form__name--title">Tên Đăng Nhập</div>
            <span className="form__name--sign-in">{user.profile.nameSignIn}</span>
          </div>
          <div className="form__name">
            <div className="form__name--title">Tên</div>
            <input
              type="text"
              value={nameUser}
              placeholder="Enter name"
              onChange={e => setNameUser(e.target.value)}
              className="form__name--input"
            />
          </div>
          <div className="form__email">
            <div className="form__email--title">Email</div>
            {user.profile.email !== "" && (
              <div className="form__email--text">
                {String(user.profile.email)
                  .slice(0, 2)
                  .padEnd(user.profile.email.length - 10, "*") + "@gmail.com"}
                <Link to="/user/account/email" className="form__email--text-link">
                  Thay đổi
                </Link>
              </div>
            )}
            {user.profile.email === "" && (
              <div className="form__email--text">
                <Link to="/user/account/email">Thêm</Link>
              </div>
            )}
          </div>
          <div className="form__phone">
            <div className="form__phone--title">Số Điện Thoại</div>
            {user.profile.numberPhone !== "" && (
              <div className="form__phone--text">
                {String(user.profile.numberPhone)
                  .slice(user.profile.numberPhone.length - 3, user.profile.numberPhone.length)
                  .padStart(user.profile.numberPhone.length, "*")}
                <Link to="/user/account/phone" className="form__phone--text-link">
                  Thay đổi
                </Link>
              </div>
            )}
            {user.profile.numberPhone === "" && (
              <div className="form__phone--text">
                <Link to="/user/account/phone">Thêm</Link>
              </div>
            )}
          </div>
          <div className="form__name--shope">
            <div className="form__name--shope_title">Tên Shop</div>
            <input
              type="text"
              value={nameShope}
              placeholder="Enter Name Shope"
              onChange={e => setNameShope(e.target.value)}
              className="form__name--input"
            />
          </div>
          <div className="form__sex">
            <div className="form__sex--title">Giới Tính</div>
            <div className="form__sex--checkbox">
              <div className="mb-3">
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="check"
                    id="inline-radio-1 male"
                    className="form-check-input"
                    checked={sex === "male"}
                    onChange={e => setSex(String(e.target.id).split(" ")[placementSetSex])}
                  />
                  <label htmlFor="inline-radio-1 male" className="form-check-label">
                    Nam
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="check"
                    id="inline-radio-2 female"
                    className="form-check-input "
                    checked={sex === "female"}
                    onChange={e => setSex(String(e.target.id).split(" ")[placementSetSex])}
                  />
                  <label htmlFor="inline-radio-2 female" className="form-check-label">
                    Nữ
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="check"
                    id="inline-radio-3 different"
                    className="form-check-input"
                    checked={sex === "different"}
                    onChange={e => setSex(String(e.target.id).split(" ")[placementSetSex])}
                  />
                  <label htmlFor="inline-radio-3 different" className="form-check-label">
                    Khác
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="form__born">
            <div className="form__born--title">Ngày Sinh</div>
            <div className="form__born--select">
              <Form.Select
                onChange={e => setDate(e.target.value)}
                aria-label="Default select example"
                value={date}
              >
                {ListDay.map((day, index) => (
                  <option key={index} value={day}>
                    {day}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                onChange={e => setMonth(e.target.value)}
                aria-label="Default select example"
                value={month}
              >
                {ListMonth.map((month, index) => (
                  <option key={index} value={month}>
                    Tháng {month}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                onChange={e => setYears(e.target.value)}
                aria-label="Default select example"
                value={years}
              >
                {ListYears.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
          <button className="form__button">Lưu</button>
        </form>
        <div className="user__description--profile_change__image">
          <div className="profile__box">
            <img src={urlImage} alt="urlImage" className="profile__box--image" />

            <label className="profile__box--file" htmlFor="profile__file">
              Chọn Ảnh
            </label>
            <input
              id="profile__file"
              type="file"
              accept="image/png, image/jpeg,image/jpg"
              style={{ display: "none" }}
            />
            <div className="profile__box--text">
              Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
