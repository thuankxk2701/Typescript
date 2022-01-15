import React, { useState, useEffect } from "react";
import { BsStarFill, BsDash, BsPlus, BsCartPlus } from "react-icons/bs";
import LogoFree from "../../logo/LogoFree";
import { FaCarSide } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  typeStateUserProps,
  addProductStoreUser,
  updateProductStoreUser,
  updateProductUser,
} from "../../../redux/reducer";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import "./ProductMainDetail.scss";

interface typeProductDetailProps {
  id: any;
  types: string[];
  title: string;
  price: number[];
  favorite: boolean;
  rating: number;
  peopleRate: number;
  peopleBought: number;
  quantity: number;
  discount: number;
  sizes: string[];
}
const ProductMainDetail: React.FC<typeProductDetailProps> = ({
  id,
  discount,
  types,
  title,
  price,
  favorite,
  rating,
  peopleRate,
  peopleBought,
  quantity,
  sizes,
}) => {
  const user = useAppSelector(state => state.usersReducer.user) as typeStateUserProps;
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [placementInputTypes, setPlacementInputTypes] = useState<number>(-1);
  const [placementInputSizes, setPlacementInputSizes] = useState<number>(-1);
  const [amount, setAmount] = useState<number>(1);
  const handleAmountDecrement = () => {
    if (amount > 1) setAmount(amount - 1);
  };
  const handleAmountIncrement = () => {
    if (amount < quantity) setAmount(amount + 1);
  };
  const handleChangeInputTypes = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setPlacementInputTypes(Number(e.target.name)) : setPlacementInputTypes(-1);
  };
  const handleChangeInputSizes = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setPlacementInputSizes(Number(e.target.name)) : setPlacementInputSizes(-1);
  };
  const handleSubmitProduct = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleAddProductStore = () => {
    if (user?.profile?.nameSignIn === "") {
      history.push("/SignIn");
      return;
    }
    if (placementInputTypes === -1) {
      toast.warn("Vui Chon Loại Sản Phảm", {
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
    if (placementInputSizes === -1) {
      toast.warn("Vui Chon Loại Kích Cỡ", {
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
    let isProductAlreadyStore = false;
    user.stores.forEach(store => {
      if (
        String(store.id) === String(id) &&
        String(store.types) === String(types[placementInputTypes]) &&
        String(store.size) === String(sizes[placementInputSizes])
      ) {
        isProductAlreadyStore = true;
      }
    });
    console.log(isProductAlreadyStore);

    if (isProductAlreadyStore) {
      dispatch(
        updateProductStoreUser({
          id: Number(id),
          quantity: amount,
          types: types[placementInputTypes],
          size: sizes[placementInputSizes],
          isBought: false,
        }),
      );
    } else {
      dispatch(
        addProductStoreUser({
          id: Number(id),
          quantity: amount,
          types: types[placementInputTypes],
          size: sizes[placementInputSizes],
          isBought: false,
        }),
      );
    }
  };
  useEffect(() => {
    dispatch(updateProductUser(user.stores));
  }, [user.stores]);

  return (
    <>
      <div className="product__main--detail-content">
        <div className="product__main--detail-content_header">
          {favorite && (
            <span className="product__main--detail-content_header__favorite">Yêu thích</span>
          )}
          {title}
        </div>
        <div className="product__main--detail-content_rate">
          <div className="product__main--detail-content_rate__star">
            <span> {rating + ".0"}</span>
            <BsStarFill className="icon" />
            <BsStarFill className="icon" />
            <BsStarFill className="icon" />
            <BsStarFill className="icon" />
            <BsStarFill className="icon" />
          </div>
          <div className="product__main--detail-content_rate__people-rate">
            <span className="product__main--detail-content_rate__people-rate--amount">
              {peopleRate / 1000}K
            </span>
            <span className="product__main--detail-content_rate__people-rate--text"> Đánh giá</span>
          </div>
          <div className="product__main--detail-content_rate__people-buy">
            <span className="product__main--detail-content_rate__people-buy--amount">
              {peopleBought / 1000}K
            </span>
            <span className="product__main--detail-content_rate__people-buy--text">Đã bán</span>
          </div>
        </div>
        <div className="product__main--detail-content_post">
          <div className="product__main--detail-content_post__box">
            <div className="product__main--detail-content_post__box-price">
              <div className="product__main--detail-content_post__box-price--init">
                <span className="product__main--detail-content_post__box-price--init_first">
                  {price[0] - 0.001 + "đ"}
                </span>{" "}
                -{" "}
                <span className="product__main--detail-content_post__box-price--init_last">
                  {price[price.length - 1] - 0.001 + "đ"}
                </span>
              </div>
              <div className="product__main--detail-content_post__box-price--shell">
                <span className="product__main--detail-content_post__box-price--shell_first">
                  {String(price[0] * ((100 - discount) / 100) - 0.001)
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
                -
                <span className="product__main--detail-content_post__box-price--shell_last">
                  {String(price[price.length - 1] * ((100 - discount) / 100) - 0.001)
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
                </span>
              </div>
              <div className="product__main--detail-content_post__box-price--discount">
                {discount}% GIẢM
              </div>
            </div>
            <div className="product__main--detail-content_post__box-text">
              <LogoFree className="product__main--detail-content_post__box-text--logo" />

              <div className="product__main--detail-content_post__box-text--left">
                <div className="product__main--detail-content_post__box-text--left_top">
                  Gì cũng rẻ
                </div>
                <div className="product__main--detail-content_post__box-text--left_bottom">
                  Giá tốt nhất so với các sản phẩm cùng loại trên shoppe!
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product__main--detail-content_movement">
          <div className="product__main--detail-content_movement__left">Vận chuyển</div>
          <div className="product__main--detail-content_movement__right">
            <div className="product__main--detail-content_movement__right-bonus">
              <img
                className="product__main--detail-content_movement__right-bonus--icon"
                alt="img"
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/pdp/1cdd37339544d858f4d0ade5723cd477.png"
              />
              <div className="product__main--detail-content_movement__right-bonus--text">
                <p className="product__main--detail-content_movement__right-bonus--text_header">
                  Miễn phí vận chuyển
                </p>
                <p className="product__main--detail-content_movement__right-bonus--text_footer">
                  Miễn phí vận chuyển cho đơn hàng trên ₫50.000
                </p>
              </div>
            </div>
            <div className="product__main--detail-content_movement__right-street">
              <FaCarSide className="product__main--detail-content_movement__right-street--icon" />
              <div className="product__main--detail-content_movement__right-street--text">
                <p className="product__main--detail-content_movement__right-street--text_header">
                  Vận Chuyển Tới
                  <span> Option select</span>
                </p>
                <p className="product__main--detail-content_movement__right-street--text_footer">
                  Phí Vận Chuyển
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmitProduct} className="product__main--detail-form">
        <div className="product__main--detail-form_type">
          <div className="product__main--detail-form_type__title">Loại</div>
          {types.map((type, index) => (
            <div key={index} className="form__chose">
              <input
                type="checkbox"
                name={String(index)}
                id={type}
                checked={placementInputTypes === index}
                className="form__chose--input"
                onChange={handleChangeInputTypes}
              />
              <label htmlFor={type} className="form__chose--label">
                {type}
              </label>
            </div>
          ))}
        </div>
        <div className="product__main--detail-form_size">
          <div className="product__main--detail-form_size__title">Kích Cỡ</div>
          {sizes.map((type, index) => (
            <div key={index} className="form__chose">
              <input
                type="checkbox"
                name={String(index)}
                id={type}
                checked={placementInputSizes === index}
                className="form__chose--input"
                onChange={handleChangeInputSizes}
              />
              <label htmlFor={type} className="form__chose--label">
                {type}
              </label>
            </div>
          ))}
        </div>
        <div className="product__main--detail-form_quantity">
          <div className="product__main--detail-form_quantity__title">Số Lượng</div>
          <div className="product__main--detail-form_quantity__count">
            <button
              onClick={handleAmountDecrement}
              className="product__main--detail-form_quantity__count-decrement"
            >
              <BsDash className="icon" />
            </button>
            <span className="product__main--detail-form_quantity__count-amount">{amount}</span>
            <button
              onClick={handleAmountIncrement}
              className="product__main--detail-form_quantity__count-increment"
            >
              <BsPlus className="icon" />
            </button>
            <div className="product__main--detail-form_quantity__count-amount--total">
              {" "}
              {quantity} sản phẩm có sẵn{" "}
            </div>
          </div>
        </div>

        <div className="product__main--detail-form_add">
          <button onClick={handleAddProductStore} className="product__main--detail-form_add__store">
            <BsCartPlus className="icon" />
            <div className="product__main--detail-form_add__store-text">Thêm Vào Giỏ Hàng</div>
          </button>
          <button className="product__main--detail-form_add__buy">Mua Ngay</button>
        </div>
      </form>
      <div className="product__main--detail-footer">
        <img
          src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/pdp/67454c89080444c5997b53109072c9e0.png"
          alt="img"
          className="product__main--detail-footer--image"
        />
        <span className="product__main--detail-footer--text">Shopee Đảm Bảo</span>
        <span className="product__main--detail-footer--detail">3 Ngày Trả Hàng / Hoàn Tiền</span>
      </div>
    </>
  );
};

export default ProductMainDetail;
