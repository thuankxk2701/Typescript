import classNames from "classnames";
import * as React from "react";
import PropTypes from "prop-types";

import { useBootstrapPrefix } from "../ThemeProvider";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";

export interface CardImgProps extends BsPrefixProps, React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: "top" | "bottom";
}

const propTypes = {
  bsPrefix: PropTypes.string,
  variant: PropTypes.oneOf(["top", "bottom"]),
  as: PropTypes.elementType,
};
const CardImg: BsPrefixRefForwardingComponent<"img", CardImgProps> = React.forwardRef(
  ({ bsPrefix, className, variant, as: Component = "img", ...props }: CardImgProps, ref) => {
    const prefix = useBootstrapPrefix(bsPrefix, "card-img");
    return (
      <Component
        ref={ref}
        className={classNames(variant ? `${prefix}-${variant}` : prefix, className)}
        {...props}
      />
    );
  },
);

CardImg.displayName = "CardImg";
CardImg.propTypes = propTypes;

export default CardImg;
