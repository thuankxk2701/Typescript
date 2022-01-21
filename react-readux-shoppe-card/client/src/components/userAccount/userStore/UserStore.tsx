import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { useHistory } from "react-router-dom";
import { typeStateUserProps } from "../../../redux/reducer";
import Form from "react-bootstrap/Form";
import { BsDash, BsPlus } from "react-icons/bs";
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
  console.log(user.stores);
  const handleSubmitFormStoreUser = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmitFormStoreUser} className="user__store">
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
          <div className="user__store--product-lists">
            {user.stores.length !== 0 &&
              user.stores.map((store, index) => (
                <div className="user__store--product-list" key={index}>
                  <input type="checkbox" className="user__store--product-list_input" />
                  <img
                    src={
                      productUser[index].listUrlImage[productUser[index].sizes.indexOf(store.size)]
                    }
                    alt={`img-${index}`}
                    className="user__store--product-list_img"
                  />
                  <div className="user__store--product-list_title">
                    <div className="user__store--product-list_title__name">
                      {productUser[index].title
                        .split(" ")
                        .map((str: string, index: number) => {
                          if (index >= 10) {
                            return "";
                          } else return str;
                        })
                        .join(" ") + ". . ."}
                    </div>
                    {productUser[index].favorite && (
                      <img
                        src="https://cf.shopee.vn/file/5fed81d33a76f27164f725ee8fc53e6a"
                        alt="img"
                        className="user__store--product-list_title__image"
                      />
                    )}
                  </div>
                  <div className="user__store--product-list_types">
                    <div className="user__store--product-list_types__classify">Phân Loại Hàng:</div>
                    <div className="user__store--product-list_types__goods">
                      {store.types},{store.size}
                    </div>
                  </div>
                  <div className="user__store--product-list_price">
                    <div className="user__store--product-list_price__initial">
                      {String(
                        productUser[index].price[productUser[index].sizes.indexOf(store.size)] -
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
                        .join(".") + "đ"}
                    </div>
                    <div className="user__store--product-list_price__shell">
                      {String(
                        productUser[index].price[productUser[index].sizes.indexOf(store.size)] *
                          ((100 - productUser[index].discount) / 100) -
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
                        .join(".") + "đ"}
                    </div>
                  </div>
                  <div className="user__store--product-list_count">
                    <button className="user__store--product-list_count__decrement">
                      <BsDash className="icon" />
                    </button>
                    <span className="user__store--product-list_count__amount">
                      {store.quantity}
                    </span>
                    <button className="user__store--product-list_count__increment">
                      <BsPlus className="icon" />
                    </button>
                  </div>
                  <div className="user__store--product-list_price__total">
                    {String(
                      productUser[index].price[productUser[index].sizes.indexOf(store.size)] *
                        ((100 - productUser[index].discount) / 100) *
                        store.quantity -
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
                      .join(".") + "đ"}
                  </div>
                  <button className="user__store--product-list_delete">Xóa</button>
                </div>
              ))}
          </div>
        </div>
        <div className="user__store--buy"></div>
      </form>
    </>
  );
};

export default UserStore;
