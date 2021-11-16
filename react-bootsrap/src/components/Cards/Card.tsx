import classNames from "classnames";
import * as React from "react";
import PropTypes from "prop-types";

import { useBootstrapPrefix } from "../ThemeProvider";
import createWithBsPrefix from "../createWithBsPrefix";
import divWithClassName from "../divWithClassName";
import CardImg from "./CardImg";
import CardHeader from "./CardHeader";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";
import { Color, Variant } from "../types";

const DivStyledAsH5 = divWithClassName("h5");
const DivStyledAsH6 = divWithClassName("h6");
const CardBody = createWithBsPrefix("card-body");
const CardTitle = createWithBsPrefix("card-title", {
  Component: DivStyledAsH5,
});

const CardSubtitle = createWithBsPrefix("card-subtitle", {
  Component: DivStyledAsH6,
});
const CardLink = createWithBsPrefix("card-link", { Component: "a" });
const CardText = createWithBsPrefix("card-text", { Component: "p" });
const CardFooter = createWithBsPrefix("card-footer");
const CardImgOverlay = createWithBsPrefix("card-img-overlay");

export interface CardProps extends BsPrefixProps, React.HTMLAttributes<HTMLElement> {
  bg?: Variant;
  text?: Color;
  border?: Variant;
  body?: boolean;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  bg: PropTypes.string,
  text: PropTypes.string,
  border: PropTypes.string,
  body: PropTypes.bool,
  as: PropTypes.elementType,
};

const defaultProps = {
  body: false,
};

const Card: BsPrefixRefForwardingComponent<"div", CardProps> = React.forwardRef<
  HTMLElement,
  CardProps
>(
  (
    { bsPrefix, className, bg, text, border, body, children, as: Component = "div", ...props },
    ref,
  ) => {
    const prefix = useBootstrapPrefix(bsPrefix, "card");
    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          className,
          prefix,
          bg && `bg-${bg}`,
          text && `text-${text}`,
          border && `border-${border}`,
        )}
      >
        {body ? <CardBody>{children}</CardBody> : children}
      </Component>
    );
  },
);

Card.displayName = "Card";
Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Object.assign(Card, {
  Img: CardImg,
  Title: CardTitle,
  Subtitle: CardSubtitle,
  Body: CardBody,
  Link: CardLink,
  Text: CardText,
  Header: CardHeader,
  Footer: CardFooter,
  ImgOverlay: CardImgOverlay,
});
