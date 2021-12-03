import classNames from "classnames";
import PropTypes from "prop-types";
import * as React from "react";
import { useContext } from "react";
import useEventCallback from "@restart/hooks/useEventCallback";

import { useBootstrapPrefix } from "../ThemeProvider";
import CloseButton, { CloseButtonVariant } from "../CloseButton";
import ToastContext from "./ToastContext";
import { BsPrefixOnlyProps } from "../helpers";

export interface ToastHeaderProps extends BsPrefixOnlyProps, React.HTMLAttributes<HTMLDivElement> {
  closeLabel?: string;
  closeVariant?: CloseButtonVariant;
  closeButton?: boolean;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  closeLabel: PropTypes.string,
  closeVariant: PropTypes.oneOf<CloseButtonVariant>(["white"]),
  closeButton: PropTypes.bool,
};

const defaultProps = {
  closeLabel: "Close",
  closeButton: false,
};

const ToastHeader = React.forwardRef<HTMLDivElement, ToastHeaderProps>(
  (
    {
      bsPrefix,
      closeLabel,
      closeVariant,
      closeButton,
      className,
      children,
      ...props
    }: ToastHeaderProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, "toast-header");

    const context = useContext(ToastContext);

    const handleClick = useEventCallback(e => {
      context?.onClose?.(e);
    });
    return (
      <div ref={ref} {...props} className={classNames(bsPrefix, className)}>
        {children}
        {closeButton && (
          <CloseButton
            aria-label={closeLabel}
            variant={closeVariant}
            onClick={handleClick}
            data-dismiss="toast"
          />
        )}
      </div>
    );
  },
);

ToastHeader.displayName = "ToastHeader";
ToastHeader.propTypes = propTypes;
ToastHeader.defaultProps = defaultProps;

export default ToastHeader;
