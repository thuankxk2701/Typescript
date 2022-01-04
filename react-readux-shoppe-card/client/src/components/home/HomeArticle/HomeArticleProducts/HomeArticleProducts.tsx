import React from "react";
import { useAppSelector } from "../../../../redux/hook";
import { stateAllProductProps } from "../../../../redux/reducer";
import { Link } from "react-router-dom";
import "./HomArticleProducts.scss";

const HomeArticleProducts: React.FC = () => {
  const products: stateAllProductProps[] = useAppSelector(state => state.products);
  const [product] = products;
  console.log(products);

  return (
    <div className="products__lists">
      <Link to={`/product-${product.id}`} className="products__list">
        <img className="products__list--image" src={product.listUrlImage[0]} alt={product.title} />
        <div className="products__list--title">
          {product.title
            .split(" ")
            .map((str: string, index: number) => {
              if (index >= 9) {
                return "";
              } else return str;
            })
            .join(" ") + ". . ."}
        </div>
        <div className="products__list--footer">
          <div className="products__list--footer-price">
            {String(product.price[0] * ((100 - product.discount) / 100) - 0.001)
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
          <div className="products__list--footer-sold">
            Đã bán{" "}
            {String(product.peopleBought)
              .split(",")
              .map((str: string, index: number) => {
                if (index === 1) {
                  return "";
                } else return str;
              })
              .join("") + "k"}
          </div>
        </div>
        {product.discount !== 0 && (
          <div className="products__list--discount">
            <span className="products__list--discount-number">{product.discount + "%"}</span>
            <span className="products__list--discount-text">giảm</span>
          </div>
        )}
        {product.customized && (
          <div className="products__list--customize">
            <img
              src="https://cf.shopee.vn/file/1102b20a83c245af2039bb62ea3e21ec"
              alt="img"
              className="products__list--customize-image"
            />
          </div>
        )}
        {product.favorite && <div className="products__list--favorite">Yêu thích</div>}
      </Link>
      <div className="products__list">text2</div>
      <div className="products__list">text3</div>
      <div className="products__list">text4</div>
      <div className="products__list">text5</div>
      <div className="products__list">text6</div>
    </div>
  );
};

export default HomeArticleProducts;
