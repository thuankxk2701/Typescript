import classNames from "classnames";
import * as React from "react";
import PropTypes from "prop-types";
import { useBootstrapPrefix } from "../ThemeProvider";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";

export interface CarouselItemProps extends BsPrefixProps, React.HTMLAttributes<HTMLElement> {
  interval?: number;
}
const propTypes = {
  as: PropTypes.elementType,
  bsPrefix: PropTypes.string,
  interval: PropTypes.number,
};

const CarouselItem: BsPrefixRefForwardingComponent<"div", CarouselItemProps> = React.forwardRef<
  HTMLElement,
  CarouselItemProps
>(({ as: Component = "div", bsPrefix, className, ...props }, ref) => {
  const finalClassName = classNames(className, useBootstrapPrefix(bsPrefix, "carousel-item"));
  return <Component ref={ref} {...props} className={finalClassName} />;
});
CarouselItem.displayName = "CarouselItem";
CarouselItem.propTypes = propTypes;

export default CarouselItem;
