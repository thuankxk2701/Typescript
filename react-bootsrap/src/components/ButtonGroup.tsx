import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { useBootstrapPrefix } from "./ThemeProvider";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "./helpers";

export interface ButtonGroupProps extends BsPrefixProps, React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "lg";
  vertical?: boolean;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  size: PropTypes.string,
  vertical: PropTypes.bool,
  role: PropTypes.string,
  as: PropTypes.elementType,
};

const defaultProps = {
  vertical: false,
  role: "group",
};

const ButtonGroup: BsPrefixRefForwardingComponent<"div", ButtonGroupProps> = React.forwardRef(
  ({ bsPrefix, size, vertical, className, as: Component = "div", ...props }, ref) => {
    const prefix = useBootstrapPrefix(bsPrefix, "btn-group");
    let baseClass = prefix;
    if (vertical) baseClass = `${prefix}-vertical`;
    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(className, baseClass, size && `${prefix}-${size}`)}
      />
    );
  },
);
ButtonGroup.displayName = "ButtonGroup";
ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

export default ButtonGroup;
