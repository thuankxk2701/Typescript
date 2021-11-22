import classNames from "classnames";
import * as React from "react";
import PropTypes from "prop-types";
import { useBootstrapPrefix } from "./ThemeProvider";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "./helpers";

export interface ContainerProps extends BsPrefixProps, React.HtmlHTMLAttributes<HTMLElement> {
  fluid?: boolean | "sm" | "md" | "lg" | "xl" | "xxl";
}

const containerSizes = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.oneOf(["sm", "md", "lg", "xl", "xxl"]),
]);

const propTypes = {
  bsPrefix: PropTypes.string,
  fluid: containerSizes,
  as: PropTypes.elementType,
};

const defaultProps = {
  fluid: false,
};

const Container: BsPrefixRefForwardingComponent<"div", ContainerProps> = React.forwardRef<
  HTMLElement,
  ContainerProps
>(({ bsPrefix, fluid, as: Component = "div", className, ...props }, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, "container");
  const suffix = typeof fluid === "string" ? `-${fluid}` : "-fluid";
  return (
    <Component
      ref={ref}
      {...props}
      className={classNames(className, fluid ? `${prefix}${suffix}` : prefix)}
    />
  );
});

Container.displayName = "Container";
Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
