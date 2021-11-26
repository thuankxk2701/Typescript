import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { useBootstrapPrefix } from "../ThemeProvider";

import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";

export interface NavbarBrandProps extends BsPrefixProps, React.HTMLAttributes<HTMLElement> {
  href?: string;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  href: PropTypes.string,
  as: PropTypes.elementType,
};

const NavbarBrand: BsPrefixRefForwardingComponent<"a", NavbarBrandProps> = React.forwardRef<
  HTMLElement,
  NavbarBrandProps
>(({ bsPrefix, className, as, ...props }, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "navbar-brand");

  const Component = as || (props.href ? "a" : "span");
  return <Component {...props} ref={ref} className={classNames(className, bsPrefix)} />;
});

NavbarBrand.displayName = "NavbarBrand";
NavbarBrand.propTypes = propTypes;

export default NavbarBrand;
