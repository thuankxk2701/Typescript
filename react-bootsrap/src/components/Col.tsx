import classNames from "classnames";
import * as React from "react";
import PropTypes from "prop-types";

import { useBootstrapPrefix } from "./ThemeProvider";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "./helpers";

type NumberAttr = number | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";

type ColOrderNumber = number | "1" | "2" | "3" | "4" | "5";
type ColOrder = ColOrderNumber | "first" | "last";
type ColSize = boolean | "auto" | NumberAttr;
type ColSpec = ColSize | { span?: ColSize; offset?: NumberAttr; order?: ColOrder };

export interface ColProps extends BsPrefixProps, React.HTMLAttributes<HTMLElement> {
  xs?: ColSpec;
  sm?: ColSpec;
  md?: ColSpec;
  lg?: ColSpec;
  xl?: ColSpec;
  xxl?: ColSpec;
}

const DEVICE_SIZES = ["xxl", "xl", "lg", "md", "sm", "xs"] as const;

const colSize = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.number,
  PropTypes.string,
  PropTypes.oneOf(["auto"]),
]);

const stringOrNumber = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

const column = PropTypes.oneOfType([
  colSize,
  PropTypes.shape({
    size: colSize,
    order: stringOrNumber,
    offset: stringOrNumber,
  }),
]);

const propTypes = {
  bsPrefix: PropTypes.string,
  as: PropTypes.elementType,
  xs: column,
  sm: column,
  md: column,
  lg: column,
  xl: column,
  xxl: column,
};

export interface UseColMetadata {
  as?: React.ElementType;
  bsPrefix: string;
  spans: string[];
}

export function useCol({ as, bsPrefix, className, ...props }: ColProps): [any, UseColMetadata] {
  bsPrefix = useBootstrapPrefix(bsPrefix, "col");

  const spans: string[] = [];
  const classes: string[] = [];

  DEVICE_SIZES.forEach(brkPoint => {
    const propValue = props[brkPoint];
    delete props[brkPoint];

    let span: ColSize | undefined;
    let offset: NumberAttr | undefined;
    let order: ColOrder | undefined;

    if (typeof propValue === "object" && propValue != null) {
      ({ span, offset, order } = propValue);
    } else {
      span = propValue;
    }

    const infix = brkPoint !== "xs" ? `-${brkPoint}` : "";

    if (span) spans.push(span === true ? `${bsPrefix}${infix}` : `${bsPrefix}${infix}-${span}`);

    if (order != null) classes.push(`order${infix}-${order}`);
    if (offset != null) classes.push(`offset${infix}-${offset}`);
  });

  return [
    { ...props, className: classNames(className, ...spans, ...classes) },
    {
      as,
      bsPrefix,
      spans,
    },
  ];
}

const Col: BsPrefixRefForwardingComponent<"div", ColProps> = React.forwardRef<
  HTMLElement,
  ColProps
>((props, ref) => {
  const [{ className, ...colProps }, { as: Component = "div", bsPrefix, spans }] = useCol(props);

  return (
    <Component
      {...colProps}
      ref={ref}
      className={classNames(className, !spans.length && bsPrefix)}
    />
  );
});

Col.displayName = "col";
Col.propTypes = propTypes;

export default Col;
