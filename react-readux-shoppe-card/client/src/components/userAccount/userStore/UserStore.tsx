import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { useHistory } from "react-router-dom";
import { typeStateUserProps } from "../../../redux/reducer";
import Form from "react-bootstrap/Form";
import "./UserStore.scss";

interface userStoreProrps {
  user: typeStateUserProps;
}

const UserStore: React.FC<userStoreProrps> = ({ user }) => {
  const history = useHistory();
  const productUser = useAppSelector(state => state.productsReducer.productUser);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<Number>(0);
  const handleChangeAmount = () => {};
  if (productUser.length === 0) {
    history.push("/");
  }
  
  return (
    <>
      <div className="user__store">
        <div className="user__store--heading">
          Store Của {String(user.profile.nameSignIn).toUpperCase()}
        </div>
        <div className="user__store--product">
          <div className="user__store--product-nav">
            <input type="checkbox" className="user__store--product-nav_choose" />
            <div className="user__store--product-nav_product">Sản Phẩm</div>
            <div className="user__store--product-nav_unit__price">Đơn Giá</div>
            <div className="user__store--product-nav_quantity">Số Lượng</div>
            <div className="user__store--product-nav_price">Giá</div>
            <div className="user__store--product-nav_operation">Thao Tác</div>
            <Form.Select
              aria-label="Default select example"
              className="user__store--product-nav_select"
            >
              <option value="noSort">All</option>
              <option value="sortPriceAscending">Tăng Dần</option>
              <option value="sortPriceDescending">Giảm Dần</option>
            </Form.Select>
          </div>

          <div className="user__store--product-list"></div>
        </div>
        <div className="user__store--buy"></div>
      </div>
    </>
  );
};

export default UserStore;
