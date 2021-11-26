import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useContext } from "react";

import useEventCallback from "@restart/hooks/useEventCallback";

import { useBootstrapPrefix } from "../ThemeProvider";
import NavbarContext from "./NavbarContext";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";

export interface NavbarToggleProps extends BsPrefixProps, React.HTMLAttributes<HTMLElement> {
  label?: string;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  as: PropTypes.elementType,
};

const defaultProps = {
  label: "Toggle navigation",
};

const NavbarToggle: BsPrefixRefForwardingComponent<"button", NavbarToggleProps> = React.forwardRef<
  HTMLElement,
  NavbarToggleProps
>(({ bsPrefix, className, children, label, as: Component = "button", onClick, ...props }, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "navbar-toggler");

  const { onToggle, expanded } = useContext(NavbarContext) || {};

  const handleClick = useEventCallback(e => {
    if (onClick) onClick(e);
    if (onToggle) onToggle();
  });

  if (Component === "button") {
    (props as any).type = "button";
  }

  return (
    <Component
      {...props}
      ref={ref}
      onClick={handleClick}
      aria-label={label}
      className={classNames(className, bsPrefix, !expanded && "collapsed")}
    >
      {children || <span className={`${bsPrefix}-icon`} />}
    </Component>
  );
});

NavbarToggle.displayName = "NavbarToggle";
NavbarToggle.propTypes = propTypes;
NavbarToggle.defaultProps = defaultProps;

export default NavbarToggle;
