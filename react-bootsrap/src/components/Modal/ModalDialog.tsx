import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { useBootstrapPrefix } from "../ThemeProvider";
import { BsPrefixProps } from "../helpers";

export interface ModalDialogProps extends React.HTMLAttributes<HTMLDivElement>, BsPrefixProps {
  size?: "sm" | "lg" | "xl";
  fullscreen?: true | "sm-down" | "md-down" | "lg-down" | "xl-down" | "xxl-down";
  centered?: boolean;
  scrollable?: boolean;
  contentClassName?: string;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  contentClassName: PropTypes.string,
  size: PropTypes.string,
  fullscreen: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  centered: PropTypes.bool,
  scrollable: PropTypes.bool,
};

const ModalDialog = React.forwardRef<HTMLDivElement, ModalDialogProps>(
  (
    {
      bsPrefix,
      className,
      contentClassName,
      centered,
      size,
      fullscreen,
      children,
      scrollable,
      ...props
    }: ModalDialogProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, "modal");

    const dialogClass = `${bsPrefix}-dialog`;

    const fullScreenClass =
      typeof fullscreen === "string"
        ? `${bsPrefix}-fullscreen-${fullscreen}`
        : `${bsPrefix}-fullscreen`;

    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          dialogClass,
          className,
          size && `${bsPrefix}-${size}`,
          centered && `${dialogClass}-centered`,
          scrollable && `${dialogClass}-scrollable`,
          fullscreen && fullScreenClass,
        )}
      >
        <div className={classNames(`${bsPrefix}-content`, contentClassName)}>{children}</div>
      </div>
    );
  },
);

ModalDialog.displayName = "ModalDialog";
ModalDialog.propTypes = propTypes as any;

export default ModalDialog;
