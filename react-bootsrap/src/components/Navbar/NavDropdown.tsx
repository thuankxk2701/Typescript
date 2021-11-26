import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { useBootstrapPrefix } from "../ThemeProvider";
import Dropdown, { DropdownProps } from "../Drop/Dropdown";
import { DropdownMenuVariant } from "../Drop/DropdownMenu";
import NavLink from "./NavLink";
import { BsPrefixRefForwardingComponent } from "../helpers";

export interface NavDropdownProps extends Omit<DropdownProps, "onSelect" | "title"> {
  title: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  menuRole?: string;
  renderMenuOnMount?: boolean;
  rootCloseEvent?: "click" | "mousedown";
  menuVariant?: DropdownMenuVariant;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  menuRole: PropTypes.string,
  renderMenuOnMount: PropTypes.bool,
  rootCloseEvent: PropTypes.string,
  menuVariant: PropTypes.oneOf<DropdownMenuVariant>(["dark"]),
};

const NavDropdown: BsPrefixRefForwardingComponent<"div", NavDropdownProps> = React.forwardRef(
  (
    {
      id,
      title,
      children,
      bsPrefix,
      className,
      rootCloseEvent,
      menuRole,
      disabled,
      active,
      renderMenuOnMount,
      menuVariant,
      ...props
    },
    ref,
  ) => {
    const navItemPrefix = useBootstrapPrefix(undefined, "nav-item");
    return (
      <Dropdown ref={ref} {...props} className={classNames(className, navItemPrefix)}>
        <Dropdown.Toggle
          id={id}
          eventKey={null}
          active={active}
          disabled={disabled}
          childBsPrefix={bsPrefix}
          as={NavLink}
        >
          {title}
        </Dropdown.Toggle>

        <Dropdown.Menu
          role={menuRole}
          renderOnMount={renderMenuOnMount}
          rootCloseEvent={rootCloseEvent}
          variant={menuVariant}
        >
          {children}
        </Dropdown.Menu>
      </Dropdown>
    );
  },
);

NavDropdown.displayName = "NavDropdown";
NavDropdown.propTypes = propTypes;

export default Object.assign(NavDropdown, {
  Item: Dropdown.Item,
  ItemText: Dropdown.ItemText,
  Divider: Dropdown.Divider,
  Header: Dropdown.Header,
});
