import PropTypes from "prop-types";
import classNames from "classnames";
import * as React from "react";
import { useBootstrapPrefix } from "./ThemeProvider";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "./helpers";
import { Color, Variant } from "./types";

export interface BadgeProps extends BsPrefixProps, React.HTMLAttributes<HTMLElement> {
  bg?: Variant;
  pill?: boolean;
  text?: Color;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  bg: PropTypes.string,
  pill: PropTypes.bool,
  text: PropTypes.string,
  as: PropTypes.elementType,
};

const defaultProps = {
  bg: "primary",
  pill: false,
};

const Badge: BsPrefixRefForwardingComponent<"span", BadgeProps> = React.forwardRef<
  HTMLElement,
  BadgeProps
>(({ bsPrefix, bg, pill, text, className, as: Component = "span", ...props }, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, "badge");
  return (
    <Component
      ref={ref}
      {...props}
      className={classNames(
        className,
        prefix,
        pill && "rounded-pill",
        text && `text-${text}`,
        bg && `bg-${bg}`,
      )}
    />
  );
});

Badge.displayName = "Badge";
Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
