import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Anchor from "@restart/ui/Anchor";
import { useNavItem, NavItemProps as BaseNavItemProps } from "@restart/ui/NavItem";
import { makeEventKey } from "@restart/ui/SelectableContext";
import { useBootstrapPrefix } from "../ThemeProvider";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";

export interface NavLinkProps extends BsPrefixProps, Omit<BaseNavItemProps, "as"> {}

const propTypes = {
  bsPrefix: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  role: PropTypes.string,
  href: PropTypes.string,
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  as: PropTypes.elementType,
};

const defaultProps = {
  disabled: false,
};

const NavLink: BsPrefixRefForwardingComponent<"a", NavLinkProps> = React.forwardRef<
  HTMLElement,
  NavLinkProps
>(({ bsPrefix, className, as: Component = Anchor, active, eventKey, ...props }, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "nav-link");
  const [navItemProps, meta] = useNavItem({
    key: makeEventKey(eventKey, props.href),
    active,
    ...props,
  });

  return (
    <Component
      {...props}
      {...navItemProps}
      ref={ref}
      className={classNames(
        className,
        bsPrefix,
        props.disabled && "disabled",
        meta.isActive && "active",
      )}
    />
  );
});

NavLink.displayName = "NavLink";
NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default NavLink;
