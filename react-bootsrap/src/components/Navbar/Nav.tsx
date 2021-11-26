import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import all from "prop-types-extra/lib/all";
import { useContext } from "react";
import { useUncontrolled } from "uncontrollable";
import BaseNav, { NavProps as BaseNavProps } from "@restart/ui/Nav";
import { EventKey } from "@restart/ui/types";
import { useBootstrapPrefix } from "../ThemeProvider";
import NavbarContext from "./NavbarContext";
import CardHeaderContext from "../Cards/CardHeaderContext";
import NavItem from "./NavItem";
import NavLink from "./NavLink";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";

export interface NavProps extends BsPrefixProps, BaseNavProps {
  navbarBsPrefix?: string;
  cardHeaderBsPrefix?: string;
  variant?: "tabs" | "pills";
  defaultActiveKey?: EventKey;
  fill?: boolean;
  justify?: boolean;
  navbar?: boolean;
  navbarScroll?: boolean;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  navbarBsPrefix: PropTypes.string,
  cardHeaderBsPrefix: PropTypes.string,
  variant: PropTypes.string,
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fill: PropTypes.bool,
  justify: all(PropTypes.bool, ({ justify, navbar }) =>
    justify && navbar ? Error("justify navbar `Nav`s are not supported") : null,
  ),
  onSelect: PropTypes.func,
  role: PropTypes.string,
  navbar: PropTypes.bool,
  navbarScroll: PropTypes.bool,
  as: PropTypes.elementType,
  onKeyDown: PropTypes.func,
};

const defaultProps = {
  justify: false,
  fill: false,
};

const Nav: BsPrefixRefForwardingComponent<"div", NavProps> = React.forwardRef<
  HTMLElement,
  NavProps
>((uncontrolledProps, ref) => {
  const {
    as = "div",
    bsPrefix: initialBsPrefix,
    variant,
    fill,
    justify,
    navbar,
    navbarScroll,
    className,
    activeKey,
    ...props
  } = useUncontrolled(uncontrolledProps, { activeKey: "onSelect" });

  const bsPrefix = useBootstrapPrefix(initialBsPrefix, "nav");

  let navbarBsPrefix;
  let cardHeaderBsPrefix;
  let isNavbar = false;

  const navbarContext = useContext(NavbarContext);
  const cardHeaderContext = useContext(CardHeaderContext);

  if (navbarContext) {
    navbarBsPrefix = navbarContext.bsPrefix;
    isNavbar = navbar == null ? true : navbar;
  } else if (cardHeaderContext) {
    ({ cardHeaderBsPrefix } = cardHeaderContext);
  }

  return (
    <BaseNav
      as={as}
      ref={ref}
      activeKey={classNames(className, {
        [bsPrefix]: !isNavbar,
        [`${navbarBsPrefix}-nav`]: isNavbar,
        [`${navbarBsPrefix}-nav-scroll`]: isNavbar && navbarScroll,
        [`${cardHeaderBsPrefix}-${variant}`]: !!cardHeaderBsPrefix,
        [`${bsPrefix}-${variant}`]: !!variant,
        [`${bsPrefix}-fill`]: fill,
        [`${bsPrefix}-justified`]: justify,
      })}
      {...props}
    />
  );
});

Nav.displayName = "Nav";
Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

export default Object.assign(Nav, {
  Item: NavItem,
  Link: NavLink,
});
