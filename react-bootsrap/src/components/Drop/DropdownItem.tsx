import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import BaseDropdownItem, {
  useDropdownItem,
  DropdownItemProps as BaseDropdownItemProps,
} from "@restart/ui/DropdownItem";

import Anchor from "@restart/ui/Anchor";
import { useBootstrapPrefix } from "../ThemeProvider";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";

export interface DropdownItemProps extends BaseDropdownItemProps, BsPrefixProps {}

const propTypes = {
  bsPrefix: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  href: PropTypes.string,
  onClick: PropTypes.func,
  as: PropTypes.elementType,
};

const DropdownItem: BsPrefixRefForwardingComponent<typeof BaseDropdownItem, DropdownItemProps> =
  React.forwardRef(
    (
      {
        bsPrefix,
        className,
        eventKey,
        disabled = false,
        onClick,
        active,
        as: Component = Anchor,
        ...props
      },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, "dropdown-item");
      const [dropdownItemProps, meta] = useDropdownItem({
        key: eventKey,
        href: props.href,
        disabled,
        onClick,
        active,
      });

      return (
        <Component
          {...props}
          {...dropdownItemProps}
          ref={ref}
          className={classNames(
            className,
            prefix,
            meta.isActive && "active",
            disabled && "disabled",
          )}
        />
      );
    },
  );

DropdownItem.displayName = "DropdownItem";
DropdownItem.propTypes = propTypes;

export default DropdownItem;
