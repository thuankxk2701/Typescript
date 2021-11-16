import classNames from "classnames";
import * as React from "react";
import PropTypes from "prop-types";
import { useButtonProps, ButtonProps as BaseButtonProps } from "@restart/ui/Button";
import { useBootstrapPrefix } from "./ThemeProvider";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "./helpers";
import { ButtonVariant } from "./types";

export interface ButtonProps extends BaseButtonProps, Omit<BsPrefixProps, "as"> {
  active?: boolean;
  variant?: ButtonVariant;
  size?: "sm" | "lg";
}

export type CommonButtonProps = "href" | "size" | "variant" | "disabled";

const propTypes = {
  bsPrefix: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  type: PropTypes.oneOf(["button", "reset", "submit", null]),
  as: PropTypes.elementType,
};

const defaultProps = {
  variant: "primary",
  active: false,
  disable: false,
};

const Button: BsPrefixRefForwardingComponent<"button", ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ as, bsPrefix, variant, size, active, className, ...props }, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, "btn");
  const [buttonProps, { tagName }] = useButtonProps({
    tagName: as,
    ...props,
  });

  const Component = tagName as React.ElementType;

  return (
    <Component
      {...props}
      {...buttonProps}
      ref={ref}
      className={classNames(
        className,
        prefix,
        active && "active",
        variant && `${prefix}-${variant}`,
        size && `${prefix}-${size}`,
        props.href && props.disabled && "disabled",
      )}
    />
  );
});

Button.displayName = "Button";
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
