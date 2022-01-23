import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";

import {
  typeStateUserProps,
  typeStateStoreUserProps,
  updateProductStoreUser,
  deleteProductStoreUser,
  stateAllProductProps,
} from "../../../redux/reducer";
import Form from "react-bootstrap/Form";
import { BsDash, BsPlus } from "react-icons/bs";
import "./UserStore.scss";

const UserStore: React.FC = () => {
  const products = useAppSelector(state => state.productsReducer.products);
  const user = useAppSelector(state => state.usersReducer.user) as typeStateUserProps;
  const [isChooseAllProduct, setIsChooseAllProduct] = useState<boolean>(false);
  let totalPriceChooseBuy: any = 0;
  let totalQuantityProductChooseBuy: number = 0;
  let productUser: stateAllProductProps[] = [];
  for (let i = 0; i < user.stores.length; i++) {
    const product = products.find(
      product => product.id === user.stores[i].id,
    ) as stateAllProductProps;
    if (user.stores[i].isBought) {
      totalPriceChooseBuy +=
        user.stores[i].quantity *
        product.price[product.sizes.indexOf(user.stores[i].size)] *
        ((100 - product.discount) / 100);
      ++totalQuantityProductChooseBuy;
    }
    productUser.push(product);
  }
  if (totalPriceChooseBuy !== 0) {
    totalPriceChooseBuy -= 0.001;
  }

  const dispatch = useAppDispatch();
  const handleSubmitFormStoreUser = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleIncrementAmount = (
    id: any,
    quantity: number,
    types: string,
    size: string,
    isBought: boolean,
    totalAmount: number,
  ) => {
    if (quantity < totalAmount)
      dispatch(
        updateProductStoreUser({
          id,
          quantity: quantity + 1,
          types,
          size,
          isBought,
        }),
      );
  };
  const handleDecrementAmount = (
    id: any,
    quantity: number,
    types: string,
    size: string,
    isBought: boolean,
  ) => {
    if (quantity > 1)
      dispatch(
        updateProductStoreUser({
          id,
          quantity: quantity - 1,
          types,
          size,
          isBought,
        }),
      );
  };
  const handleDeleteProduct = (store: typeStateStoreUserProps) => {
    dispatch(deleteProductStoreUser(store));
  };
  const handleChangeInputCheckboxProduct = (
    id: any,
    quantity: number,
    types: string,
    size: string,
    isBought: boolean,
  ) => {
    dispatch(
      updateProductStoreUser({
        id,
        quantity,
        types,
        size,
        isBought: !isBought,
      }),
    );
  };
  const handleChooseBuyAllProduct = (userStores: typeStateStoreUserProps[]) => {
    for (let userStore of userStores) {
      dispatch(
        updateProductStoreUser({
          id: userStore.id,
          quantity: userStore.quantity,
          types: userStore.types,
          size: userStore.size,
          isBought: !isChooseAllProduct,
        }),
      );
    }
    setIsChooseAllProduct(!isChooseAllProduct);
  };
  return (
    <>
      <form onSubmit={handleSubmitFormStoreUser} className="user__store">
        <div className="user__store--heading">
          Store Của {String(user.profile.nameSignIn).toUpperCase()}
        </div>
        <div className="user__store--product">
          <div className="user__store--product-nav">
            <input
              type="checkbox"
              checked={isChooseAllProduct}
              onChange={() => handleChooseBuyAllProduct(user.stores)}
              className="user__store--product-nav_choose"
            />
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
                  <input
                    type="checkbox"
                    checked={store.isBought}
                    onChange={() =>
                      handleChangeInputCheckboxProduct(
                        store.id,
                        store.quantity,
                        store.types,
                        store.size,
                        store.isBought,
                      )
                    }
                    className="user__store--product-list_input"
                  />
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
                    <button
                      onClick={() =>
                        handleDecrementAmount(
                          store.id,
                          store.quantity,
                          store.types,
                          store.size,
                          store.isBought,
                        )
                      }
                      className="user__store--product-list_count__decrement"
                    >
                      <BsDash className="icon" />
                    </button>
                    <span className="user__store--product-list_count__amount">
                      {store.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleIncrementAmount(
                          store.id,
                          store.quantity,
                          store.types,
                          store.size,
                          store.isBought,
                          productUser[index].quantity,
                        )
                      }
                      className="user__store--product-list_count__increment"
                    >
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
                  <button
                    onClick={() => handleDeleteProduct(store)}
                    className="user__store--product-list_delete"
                  >
                    Xóa
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="user__store--buy">
          <div className="user__store--buy-total">
            {`Tổng thanh toán (${totalQuantityProductChooseBuy} sản phẩm) : `}
            <span className="user__store--buy-total_price">
              {String(totalPriceChooseBuy)
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
            </span>
          </div>
          <button className="user__store--buy-button">Mua Hàng</button>
        </div>
      </form>
    </>
  );
};

export default UserStore;
