import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useBootstrapPrefix } from "../ThemeProvider";
import { CloseButtonVariant } from "../CloseButton";
import AbstractModalHeader, { AbstractModalHeaderProps } from "../AbstractModalHeader";
import { BsPrefixOnlyProps } from "../helpers";

export interface ModalHeaderProps extends AbstractModalHeaderProps, BsPrefixOnlyProps {}

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

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ bsPrefix, className, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, "modal-header");
    return <AbstractModalHeader ref={ref} {...props} className={classNames(className, bsPrefix)} />;
  },
);
ModalHeader.displayName = "ModalHeader";
ModalHeader.propTypes = propTypes;
ModalHeader.defaultProps = defaultProps;

export default ModalHeader;
