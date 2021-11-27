import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { useBootstrapPrefix } from "./ThemeProvider";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "./helpers";

type RowColWidth =
  | number
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "auto";

type RowColumns = RowColWidth | { cols?: RowColWidth };

export interface RowProps extends BsPrefixProps, React.HTMLAttributes<HTMLElement> {
  xs?: RowColumns;
  sm?: RowColumns;
  md?: RowColumns;
  lg?: RowColumns;
  xl?: RowColumns;
  xxl?: RowColumns;
}

const DEVICE_SIZES = ["xxl", "xl", "lg", "md", "sm", "xs"] as const;
const rowColWidth = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

const rowColumns = PropTypes.oneOfType([
  rowColWidth,
  PropTypes.shape({
    cols: rowColWidth,
  }),
]);

const propTypes = {
  bsPrefix: PropTypes.string,
  as: PropTypes.elementType,
  xs: rowColumns,
  sm: rowColumns,
  md: rowColumns,
  lg: rowColumns,
  xl: rowColumns,
  xxl: rowColumns,
};

const Row: BsPrefixRefForwardingComponent<"div", RowProps> = React.forwardRef<
  HTMLElement,
  RowProps
>(({ bsPrefix, className, as: Component = "div", ...props }: RowProps, ref) => {
  const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, "row");
  const sizePrefix = `${decoratedBsPrefix}-cols`;
  const classes: string[] = [];

  DEVICE_SIZES.forEach(brkPoint => {
    const propValue = props[brkPoint];
    delete props[brkPoint];

    let cols;
    if (propValue != null && typeof propValue === "object") {
      ({ cols } = propValue);
    } else {
      cols = propValue;
    }

    const infix = brkPoint !== "xs" ? `-${brkPoint}` : "";

    if (cols != null) classes.push(`${sizePrefix}${infix}-${cols}`);
  });

  return (
    <Component
      ref={ref}
      {...props}
      className={classNames(className, decoratedBsPrefix, ...classes)}
    />
  );
});

Row.displayName = "Row";
Row.propTypes = propTypes;

export default Row;
