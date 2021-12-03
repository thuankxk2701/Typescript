import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { useBootstrapPrefix } from "./ThemeProvider";
import PageItem, { Ellipsis, First, Last, Next, Prev } from "./PageItem";
import { BsPrefixProps } from "./helpers";

type PaginationSize = "sm" | "lg";

export interface PaginationProps extends BsPrefixProps, React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "lg";
}

const propTypes = {
  bsPrefix: PropTypes.string,
  size: PropTypes.oneOf<PaginationSize>(["sm", "lg"]),
};

const Pagination = React.forwardRef<HTMLUListElement, PaginationProps>(
  ({ bsPrefix, className, size, ...props }, ref) => {
    const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, "pagination");
    return (
      <ul
        ref={ref}
        {...props}
        className={classNames(className, decoratedBsPrefix, size && `${decoratedBsPrefix}-${size}`)}
      />
    );
  },
);

Pagination.propTypes = propTypes;
Pagination.displayName = "Pagination";

export default Object.assign(Pagination, {
  First,
  Prev,
  Ellipsis,
  Item: PageItem,
  Next,
  Last,
});
