import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import useEventCallback from "@restart/hooks/useEventCallback";
import { useNavItem, NavItemProps as BaseNavItemProps } from "@restart/ui/NavItem";
import { makeEventKey } from "@restart/ui/SelectableContext";
import { useBootstrapPrefix } from "./ThemeProvider";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "./helpers";
import { Variant } from "./types";

export interface ListGroupItemProps extends Omit<BaseNavItemProps, "onSelect">, BsPrefixProps {
  action?: boolean;
  onClick?: React.MouseEventHandler;
  variant?: Variant;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  variant: PropTypes.string,
  action: PropTypes.bool,
  disabled: PropTypes.bool,
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  href: PropTypes.string,
  as: PropTypes.elementType,
};

const ListGroupItem: BsPrefixRefForwardingComponent<"a", ListGroupItemProps> = React.forwardRef<
  HTMLElement,
  ListGroupItemProps
>(({ bsPrefix, active, disabled, eventKey, className, variant, action, as, ...props }, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "list-group-item");
  const [navItemProps, meta] = useNavItem({
    key: makeEventKey(eventKey, props.href),
    active,
    ...props,
  });

  const handleClick = useEventCallback(event => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    navItemProps.onClick(event);
  });
  if (disabled && props.tabIndex === undefined) {
    props.tabIndex = -1;
    props["aria-disabled"] = true;
  }

  // eslint-disable-next-line no-nested-ternary
  const Component = as || (action ? (props.href ? "a" : "button") : "div");

  return (
    <Component
      ref={ref}
      {...props}
      {...navItemProps}
      onClick={handleClick}
      className={classNames(
        className,
        bsPrefix,
        meta.isActive && "active",
        disabled && "disabled",
        variant && `${bsPrefix}-${variant}`,
        action && `${bsPrefix}-action`,
      )}
    />
  );
});
ListGroupItem.propTypes = propTypes;
ListGroupItem.displayName = "ListGroupItem";

export default ListGroupItem;
