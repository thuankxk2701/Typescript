import classNames from "classnames";
import * as React from "react";
import PropTypes from "prop-types";
import Anchor from "@restart/ui/Anchor";
import { useBootstrapPrefix } from "./ThemeProvider";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "./helpers";

export interface BreadcrumbItemProps
  extends BsPrefixProps,
    Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  active?: boolean;
  href?: string;
  linkAs?: React.ElementType;
  target?: string;
  title?: React.ReactNode;
  linkProps?: Record<string, any>;
}
const propTypes = {
  bsPrefix: PropTypes.string,
  active: PropTypes.bool,
  href: PropTypes.string,
  linkAs: PropTypes.elementType,
  title: PropTypes.node,
  target: PropTypes.string,
  linkProps: PropTypes.object,
  as: PropTypes.elementType,
};

const defaultProps = {
  active: false,
  linkProps: {},
};

const BreadcrumbItem: BsPrefixRefForwardingComponent<"li", BreadcrumbItemProps> = React.forwardRef<
  HTMLElement,
  BreadcrumbItemProps
>(
  (
    {
      bsPrefix,
      active,
      children,
      className,
      as: Component = "li",
      linkAs: LinkComponent = Anchor,
      linkProps,
      href,
      title,
      target,
      ...props
    },
    ref,
  ) => {
    const prefix = useBootstrapPrefix(bsPrefix, "breadcrumb-item");
    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(prefix, className, { active })}
        aria-current={active ? "page" : undefined}
      >
        {active ? (
          children
        ) : (
          <LinkComponent {...linkProps} href={href} title={title} target={target}>
            {children}
          </LinkComponent>
        )}
      </Component>
    );
  },
);

BreadcrumbItem.displayName = "BreadcrumbItem";
BreadcrumbItem.propTypes = propTypes;
BreadcrumbItem.defaultProps = defaultProps;
export default BreadcrumbItem;
