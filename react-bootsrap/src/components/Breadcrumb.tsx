import classNames from "classnames";
import * as React from "react";
import PropTypes from "prop-types";

import { useBootstrapPrefix } from "./ThemeProvider";
import BreadcrumbItem from "./BreadcrumbItem";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "./helpers";

export interface BreadcrumbProps extends BsPrefixProps, React.HTMLAttributes<HTMLElement> {
  label?: string;
  listProps?: React.OlHTMLAttributes<HTMLOListElement>;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  label: PropTypes.string,
  listProps: PropTypes.object,
  as: PropTypes.elementType,
};
const defaultProps = {
  label: "breadcrumb",
  listProps: {},
};

const Breadcrumb: BsPrefixRefForwardingComponent<"nav", BreadcrumbProps> = React.forwardRef<
  HTMLElement,
  BreadcrumbProps
>(({ bsPrefix, className, listProps, children, label, as: Component = "nav", ...props }, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, "breadcrumb");
  return (
    <Component aria-label={label} className={className} ref={ref} {...props}>
      <ol {...listProps} className={classNames(prefix, listProps?.className)}>
        {children}
      </ol>
    </Component>
  );
});

Breadcrumb.displayName = "Breadcrumb";
Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;

export default Object.assign(Breadcrumb, {
  Item: BreadcrumbItem,
});
