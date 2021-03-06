import React, { useEffect } from "react";
import Navbar from "../home/NavbarHome/Navbar";
import { useParams } from "react-router-dom";
import { getProduct, stateAllProductProps } from "../../redux/reducer";

import { useAppDispatch, useAppSelector } from "../../redux/hook";
import Spinner from "react-bootstrap/Spinner";
import ProductMainCarousel from "./productMainCarousel/ProductMainCarousel";
import ProductMainDetail from "./productMainDetail/ProductMainDetail";
import ProductDetailOwner from "./productDetailOwner/ProductDetailOwner";
import ProductDescription from "./productDescription/ProductDescription";
import LoginFooter from "../login/LoginFooter";
import "./Product.scss";
const Product: React.FC = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(
    (state: any) => state.productsReducer.product,
  ) as stateAllProductProps;

  useEffect(() => {
    dispatch(getProduct(id));
  }, []);

  const { id } = useParams<any>();

  if (!product) {
    return (
      <div className="product__spinner">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="product">
      <Navbar />
      <div className="product__connective">
        <span className="product__connective--main">Shoppe</span>
        {" > "}
        <span className="product__connective--page">{product.title}</span>
      </div>
      <div className="product__main">
        <div className="product__main--carousel">
          <ProductMainCarousel
            listUrlImage={product.listUrlImage}
            numberOfFavorites={product.numberOfFavorites}
          />
        </div>
        <div className="product__main--detail">
          <ProductMainDetail
            id={id}
            discount={product.discount}
            types={product.types}
            title={product.title}
            price={product.price}
            favorite={product.favorite}
            rating={product.rating}
            peopleRate={product.peopleRate}
            peopleBought={product.peopleBought}
            quantity={product.quantity}
            sizes={product.sizes}
          />
        </div>
      </div>
      <div className="product__owner">
        <ProductDetailOwner
          logoUrl={product.owner.logoUrl}
          name={product.owner.name}
          participation={product.owner.participation}
          peopleFlowing={product.owner.peopleFlowing}
          product={product.owner.product}
          rate={product.owner.rate}
          responseRate={product.owner.responseRate}
          responseTime={product.owner.responseTime}
          timeActiveAgo={product.owner.timeActiveAgo}
          favorite={product.favorite}
        />
      </div>
      <div className="product__description">
        <ProductDescription
          category={product.description.detailProduct.category}
          heightSkirt={product.description.detailProduct.heightSkirt}
          season={product.description.detailProduct.season}
          sendAddress={product.description.detailProduct.sendAddress}
          style={product.description.detailProduct.style}
          substance={product.description.detailProduct.substance}
          typeSkirt={product.description.detailProduct.typeSkirt}
          waitVersion={product.description.detailProduct.waitVersion}
          productDescription={product.description.productDescription}
        />
      </div>
      <div className="product__line"></div>
      <LoginFooter />
    </div>
  );
};

export default Product;
