import React, { useEffect } from "react";
import Navbar from "../home/NavbarHome/Navbar";
import { useParams } from "react-router-dom";
import { getProduct } from "../../redux/reducer";
import { typesInitialStateProps } from "../../redux/reducer";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import Spinner from "react-bootstrap/Spinner";
import ProductMainCarousel from "./productMainCarousel/ProductMainCarousel";
import "./Product.scss";
const Product: React.FC = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state: typesInitialStateProps) => state.product);

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
  console.log(product);

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
        <div className="product__main--detail">Right</div>
      </div>
    </div>
  );
};

export default Product;
