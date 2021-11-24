import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import warning from "warning";
import { useUncontrolled } from "uncontrollable";
import BaseNav, { NavProps as BaseNavProps } from "@restart/ui/Nav";
import { EventKey } from "@restart/ui/types";
import { useBootstrapPrefix } from "./ThemeProvider";
import ListGroupItem from "./ListGroupItem";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "./helpers";

export interface ListGroupProps extends BsPrefixProps, BaseNavProps {
  variant?: "flush";
  horizontal?: boolean | "sm" | "md" | "lg" | "xl" | "xxl";
  defaultActiveKey?: EventKey;
  numbered?: boolean;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  variant: PropTypes.oneOf(["flush"]),
  horizontal: PropTypes.oneOf([true, "sm", "md", "lg", "xl", "xxl"]),
  numbered: PropTypes.bool,
  as: PropTypes.elementType,
};

const ListGroup: BsPrefixRefForwardingComponent<"div", ListGroupProps> = React.forwardRef<
  HTMLElement,
  ListGroupProps
>((props, ref) => {
  const {
    className,
    bsPrefix: initialBsPrefix,
    variant,
    horizontal,
    numbered,
    as = "div",
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: "onSelect",
  });
  const bsPrefix = useBootstrapPrefix(initialBsPrefix, "list-group");
  let horizontalVariant: string | undefined;
  if (horizontal) {
    horizontalVariant = horizontal === true ? "horizontal" : `horizontal-${horizontal}`;
  }
  warning(
    !(horizontal && variant === "flush"),
    '`variant="flush"` and `horizontal` should not be used together.',
  );

  return (
    <BaseNav
      ref={ref}
      {...controlledProps}
      as={as}
      className={classNames(
        className,
        bsPrefix,
        variant && `${bsPrefix}-${variant}`,
        horizontalVariant && `${bsPrefix}-${horizontalVariant}`,
        numbered && `${bsPrefix}-numbered`,
      )}
    />
  );
});

ListGroup.propTypes = propTypes;
ListGroup.displayName = "ListGroup";

export default Object.assign(ListGroup, {
  Item: ListGroupItem,
});
