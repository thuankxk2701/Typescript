import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useBootstrapPrefix } from "../ThemeProvider";

import { BsPrefixOnlyProps } from "../helpers";

export interface TableProps extends BsPrefixOnlyProps, React.TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  bordered?: boolean;
  borderless?: boolean;
  hover?: boolean;
  size?: string;
  variant?: string;
  responsive?: boolean | string;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  striped: PropTypes.bool,
  bordered: PropTypes.bool,
  borderless: PropTypes.bool,
  hover: PropTypes.bool,
  size: PropTypes.string,
  variant: PropTypes.string,
  responsive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      bsPrefix,
      className,
      striped,
      bordered,
      borderless,
      hover,
      size,
      variant,
      responsive,
      ...props
    },
    ref,
  ) => {
    const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, "table");
    const classes = classNames(
      className,
      decoratedBsPrefix,
      variant && `${decoratedBsPrefix}-${variant}`,
      size && `${decoratedBsPrefix}-${size}`,
      striped && `${decoratedBsPrefix}-striped`,
      bordered && `${decoratedBsPrefix}-bordered`,
      borderless && `${decoratedBsPrefix}-borderless`,
      hover && `${decoratedBsPrefix}-hover`,
    );

    const table = <table {...props} className={classes} ref={ref} />;
    if (responsive) {
      let responsiveClass = `${decoratedBsPrefix}-responsive`;
      if (typeof responsive === "string") {
        responsiveClass = `${responsiveClass}-${responsive}`;
      }
      return <div className={responsiveClass}>{table}</div>;
    }
    return table;
  },
);

Table.propTypes = propTypes;

export default Table;
