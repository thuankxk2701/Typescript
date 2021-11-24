import * as React from "react";
import PropTypes from "prop-types";
import Dropdown, { DropdownProps } from "./Dropdown";
import DropdownToggle, { PropsFromToggle } from "./DropdownToggle";
import DropdownMenu, { DropdownMenuVariant } from "./DropdownMenu";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";
import { alignPropType } from "../types";

export interface DropdownButtonProps
  extends Omit<DropdownProps, "title">,
    PropsFromToggle,
    BsPrefixProps {
  title: React.ReactNode;
  menuRole?: string;
  renderMenuOnMount?: boolean;
  rootCloseEvent?: "click" | "mousedown";
  menuVariant?: DropdownMenuVariant;
}

const propTypes = {
  id: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  align: alignPropType,
  menuRole: PropTypes.string,
  renderMenuOnMount: PropTypes.bool,
  rootCloseEvent: PropTypes.string,
  menuVariant: PropTypes.oneOf<DropdownMenuVariant>(["dark"]),
  bsPrefix: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
};

const DropdownButton: BsPrefixRefForwardingComponent<"div", DropdownButtonProps> = React.forwardRef<
  HTMLElement,
  DropdownButtonProps
>(
  (
    {
      title,
      children,
      bsPrefix,
      rootCloseEvent,
      variant,
      size,
      menuRole,
      renderMenuOnMount,
      disabled,
      href,
      id,
      menuVariant,
      ...props
    },
    ref,
  ) => (
    <Dropdown ref={ref} {...props}>
      <DropdownToggle
        id={id}
        href={href}
        size={size}
        variant={variant}
        disabled={disabled}
        childBsPrefix={bsPrefix}
      >
        {title}
      </DropdownToggle>
      <DropdownMenu
        role={menuRole}
        renderOnMount={renderMenuOnMount}
        rootCloseEvent={rootCloseEvent}
        variant={menuVariant}
      >
        {children}
      </DropdownMenu>
    </Dropdown>
  ),
);

DropdownButton.displayName = "DropdownButton";
DropdownButton.propTypes = propTypes;

export default DropdownButton;
