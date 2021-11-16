import classNames from "classnames";
import PropTypes from "prop-types";
import * as React from "react";
import { useBootstrapPrefix } from "./ThemeProvider";

import { BsPrefixProps } from "./helpers";

export interface ButtonToolbarProps extends BsPrefixProps, React.HTMLAttributes<HTMLElement> {}

const propTypes = {
  bsPrefix: PropTypes.string,
  role: PropTypes.string,
};

const defaultProps = {
  role: "toolbar",
};

const ButtonToolbar = React.forwardRef<HTMLDivElement, ButtonToolbarProps>(
  ({ bsPrefix, className, ...props }, ref) => {
    const prefix = useBootstrapPrefix(bsPrefix, "btn-toolbar");
    return <div {...props} ref={ref} className={classNames(className, prefix)} />;
  },
);
ButtonToolbar.displayName = "ButtonToolbar";
ButtonToolbar.propTypes = propTypes;
ButtonToolbar.defaultProps = defaultProps;
export default ButtonToolbar;
