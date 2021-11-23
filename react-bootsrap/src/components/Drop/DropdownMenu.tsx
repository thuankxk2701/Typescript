import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useContext } from "react";
import { useDropdownMenu, UseDropdownMenuOptions } from "@restart/ui/DropdownMenu";
import useIsomorphicEffect from "@restart/hooks/useIsomorphicEffect";
import useMergedRefs from "@restart/hooks/useMergedRefs";
import { SelectCallback } from "@restart/ui/types";
import warning from "warning";
import DropdownContext, { DropDirection } from "./DropdownContext";
import InputGroupContext from "../InputGroupContext";
import NavbarContext from "../Navbar/NavbarContext";
import { useBootstrapPrefix } from "../ThemeProvider";
import useWrappedRefWithWarning from "../useWrappedRefWithWarning";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";
import { AlignType, AlignDirection, alignPropType, Placement } from "../types";

export type DropdownMenuVariant = "dark" | string;

export interface DropdownMenuProps
  extends BsPrefixProps,
    Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  show?: boolean;
  renderOnMount?: boolean;
  flip?: boolean;
  align?: AlignType;
  onSelect?: SelectCallback;
  rootCloseEvent?: "click" | "mousedown";
  popperConfig?: UseDropdownMenuOptions["popperConfig"];
  variant?: DropdownMenuVariant;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  show: PropTypes.bool,
  renderOnMount: PropTypes.bool,
  flip: PropTypes.bool,
  align: alignPropType,
  onSelect: PropTypes.func,
  rootCloseEvent: PropTypes.oneOf(["click", "mousedown"]),
  as: PropTypes.elementType,
  popperConfig: PropTypes.object,
  variant: PropTypes.string,
};

const defaultProps: Partial<DropdownMenuProps> = {
  flip: true,
};

export function getDropdownMenuPlacement(
  alignEnd: boolean,
  dropDirection?: DropDirection,
  isRTL?: boolean,
) {
  const topStart = isRTL ? "top-end" : "top-start";
  const topEnd = isRTL ? "top-start" : "top-end";
  const bottomStart = isRTL ? "bottom-end" : "bottom-start";
  const bottomEnd = isRTL ? "bottom-start" : "bottom-end";
  const leftStart = isRTL ? "right-start" : "left-start";
  const leftEnd = isRTL ? "right-end" : "left-end";
  const rightStart = isRTL ? "left-start" : "right-start";
  const rightEnd = isRTL ? "left-end" : "right-end";

  let placement: Placement = alignEnd ? bottomEnd : bottomStart;
  if (dropDirection === "up") placement = alignEnd ? topEnd : topStart;
  else if (dropDirection === "end") placement = alignEnd ? rightEnd : rightStart;
  else if (dropDirection === "start") placement = alignEnd ? leftEnd : leftStart;
  return placement;
}

const DropdownMenu: BsPrefixRefForwardingComponent<"div", DropdownMenuProps> = React.forwardRef<
  HTMLElement,
  DropdownMenuProps
>(
  (
    {
      bsPrefix,
      className,
      align,
      rootCloseEvent,
      flip,
      show: showProps,
      renderOnMount,
      as: Component = "div",
      popperConfig,
      variant,
      ...props
    },
    ref,
  ) => {
    let alignEnd = false;
    const isNavbar = useContext(NavbarContext);
    const prefix = useBootstrapPrefix(bsPrefix, "dropdown-menu");
    const { align: contextAlign, drop, isRTL } = useContext(DropdownContext);
    align = align || contextAlign;
    const isInputGroup = useContext(InputGroupContext);

    const alignClasses: string[] = [];
    if (align) {
      if (typeof align === "object") {
        const keys = Object.keys(align);

        warning(
          keys.length === 1,
          "There should only be 1 breakpoint when passing an object to `align`",
        );
        if (keys.length) {
          const brkPoint = keys[0];
          const direction: AlignDirection = align[brkPoint];

          alignEnd = direction === "start";
          alignClasses.push(`${prefix}-${brkPoint}-${direction}`);
        }
      } else if (align === "end") {
        alignEnd = true;
      }
    }

    const placement = getDropdownMenuPlacement(alignEnd, drop, isRTL);

    const [menuProps, { hasShown, popper, show, toggle }] = useDropdownMenu({
      flip,
      rootCloseEvent,
      show: showProps,
      usePopper: !isNavbar && alignClasses.length === 0,
      offset: [0, 2],
      popperConfig,
      placement,
    });

    menuProps.ref = useMergedRefs(useWrappedRefWithWarning(ref, "DropdownMenu"), menuProps.ref);
    useIsomorphicEffect(() => {
      if (show) popper?.update();
    }, [show]);

    if (!hasShown && !renderOnMount && !isInputGroup) return null;

    if (typeof Component !== "string") {
      menuProps.show = show;
      menuProps.close = () => toggle?.(false);
      menuProps.align = align;
    }

    let style = props.style;
    if (popper?.placement) {
      style = { ...props.style, ...menuProps.style };
      props["x-placement"] = popper.placement;
    }

    return (
      <Component
        {...props}
        {...menuProps}
        style={style}
        {...((alignClasses.length || isNavbar) && {
          "data-bs-popper": "static",
        })}
        className={classNames(
          className,
          prefix,
          show && "show",
          alignEnd && `${prefix}-end`,
          variant && `${prefix}-${variant}`,
          ...alignClasses,
        )}
      />
    );
  },
);

DropdownMenu.displayName = "DropdownMenu";
DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;

export default DropdownMenu;
