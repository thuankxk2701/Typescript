import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { useBootstrapPrefix } from "./ThemeProvider";
import { CloseButtonVariant } from "./CloseButton";
import AbstractModalHeader, { AbstractModalHeaderProps } from "./AbstractModalHeader";
import { BsPrefixOnlyProps } from "./helpers";

export interface OffcanvasHeaderProps extends AbstractModalHeaderProps, BsPrefixOnlyProps {}

const propTypes = {
  bsPrefix: PropTypes.string,
  closeLabel: PropTypes.string,
  closeVariant: PropTypes.oneOf<CloseButtonVariant>(["white"]),
  closeButton: PropTypes.bool,
  onHide: PropTypes.func,
};

const defaultProps = {
  closeLabel: "Close",
  closeButton: false,
};

const OffcanvasHeader = React.forwardRef<HTMLDivElement, OffcanvasHeaderProps>(
  ({ bsPrefix, className, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, "offcanvas-header");
    return <AbstractModalHeader ref={ref} {...props} className={classNames(className, bsPrefix)} />;
  },
);

OffcanvasHeader.displayName = "OffcanvasHeader";
OffcanvasHeader.propTypes = propTypes;
OffcanvasHeader.defaultProps = defaultProps;

export default OffcanvasHeader;
