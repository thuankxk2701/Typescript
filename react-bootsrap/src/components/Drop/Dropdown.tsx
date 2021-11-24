import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useContext, useMemo } from "react";
import BaseDropdown, {
  DropdownProps as BaseDropdownProps,
  ToggleMetadata,
} from "@restart/ui/Dropdown";
import { useUncontrolled } from "uncontrollable";
import useEventCallback from "@restart/hooks/useEventCallback";
import DropdownContext, { DropDirection } from "./DropdownContext";
import DropdownItem from "./DropdownItem";
import DropdownMenu, { getDropdownMenuPlacement } from "./DropdownMenu";
import DropdownToggle from "./DropdownToggle";
import InputGroupContext from "../InputGroupContext";
import { useBootstrapPrefix, useIsRTL } from "../ThemeProvider";
import createWithBsPrefix from "../createWithBsPrefix";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";
import { AlignType, alignPropType } from "../types";

const DropdownHeader = createWithBsPrefix("dropdown-header", {
  defaultProps: { role: "heading" },
});

const DropdownDivider = createWithBsPrefix("dropdown-divider", {
  Component: "hr",
  defaultProps: { role: "separator" },
});

const DropdownItemText = createWithBsPrefix("dropdown-item-text", {
  Component: "span",
});

export interface DropdownProps
  extends BaseDropdownProps,
    BsPrefixProps,
    Omit<React.HTMLAttributes<HTMLElement>, "onSelect" | "children"> {
  drop?: DropDirection;
  align?: AlignType;
  flip?: boolean;
  focusFirstItemOnShow?: boolean | "keyboard";
  navbar?: boolean;
  autoClose?: boolean | "outside" | "inside";
}

const propTypes = {
  bsPrefix: PropTypes.string,
  drop: PropTypes.oneOf(["up", "down", "start", "end"]),
  as: PropTypes.elementType,
  align: alignPropType,
  show: PropTypes.bool,
  flip: PropTypes.bool,
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
  focusFirstItemOnShow: PropTypes.oneOf([false, true, "keyboard"]),
  navbar: PropTypes.bool,
  autoClose: PropTypes.oneOf([true, false, "outside", "inside"]),
};

const defaultProps: Partial<DropdownProps> = {
  navbar: false,
  align: "start",
  autoClose: true,
};

const Dropdown: BsPrefixRefForwardingComponent<"div", DropdownProps> = React.forwardRef<
  HTMLElement,
  DropdownProps
>((pProps, ref) => {
  const {
    bsPrefix,
    drop,
    show,
    className,
    align,
    onSelect,
    onToggle,
    focusFirstItemOnShow,
    as: Component = "div",
    navbar: _4,
    autoClose,
    ...props
  } = useUncontrolled(pProps, { show: "onToggle" });
  const isInputGroup = useContext(InputGroupContext);
  const prefix = useBootstrapPrefix(bsPrefix, "dropdown");
  const isRTL = useIsRTL();

  const isClosingPermitted = (source: string): boolean => {
    if (autoClose === false) return source === "click";

    if (autoClose === "inside") return source !== "rootClose";

    if (autoClose === "outside") return source !== "select";

    return true;
  };

  const handleToggle = useEventCallback((nextShow: boolean, meta: ToggleMetadata) => {
    if (
      meta.originalEvent!.currentTarget === document &&
      (meta.source !== "keydown" || (meta.originalEvent as any).key === "Escape")
    )
      meta.source = "rootClose";

    if (isClosingPermitted(meta.source!)) onToggle?.(nextShow, meta);
  });

  const alignEnd = align === "end";
  const placement = getDropdownMenuPlacement(alignEnd, drop, isRTL);

  const contextValue = useMemo(
    () => ({
      align,
      drop,
      isRTL,
    }),
    [align, drop, isRTL],
  );
  return (
    <DropdownContext.Provider value={contextValue}>
      <BaseDropdown
        placement={placement}
        show={show}
        onSelect={onSelect}
        onToggle={handleToggle}
        focusFirstItemOnShow={focusFirstItemOnShow}
        itemSelector={`.${prefix}-item:not(.disabled):not(:disabled)`}
      >
        {isInputGroup ? (
          props.children
        ) : (
          <Component
            {...props}
            ref={ref}
            className={classNames(
              className,
              show && "show",
              (!drop || drop === "down") && prefix,
              drop === "up" && "dropup",
              drop === "end" && "dropend",
              drop === "start" && "dropstart",
            )}
          />
        )}
      </BaseDropdown>
    </DropdownContext.Provider>
  );
});

Dropdown.displayName = "Dropdown";
Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

export default Object.assign(Dropdown, {
  Toggle: DropdownToggle,
  Menu: DropdownMenu,
  Item: DropdownItem,
  ItemText: DropdownItemText,
  Divider: DropdownDivider,
  Header: DropdownHeader,
});
