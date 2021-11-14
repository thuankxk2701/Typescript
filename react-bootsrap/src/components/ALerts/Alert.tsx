import classNames from "classnames";
import * as React from "react";
import PropTypes from "prop-types";
import elementType from "prop-types-extra/lib/elementType";
import { useUncontrolled } from "uncontrollable";
import useEventCallback from "@restart/hooks/useEventCallback";
import Anchor from "@restart/ui/Anchor";
import { useBootstrapPrefix } from "../ThemeProvider";
import Fade from "../Fade";
import CloseButton, { CloseButtonVariant } from "../CloseButton";
import { Variant } from "../types";
import divWithClassName from "../divWithClassName";
import createWithBsPrefix from "../createWithBsPrefix";
import { TransitionType } from "../helpers";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  bsPrefix?: string;
  variant?: Variant;
  dismissible?: boolean;
  show?: boolean;
  onClose?: (a: any, b: any) => void;
  closeLabel?: string;
  closeVariant?: CloseButtonVariant;
  transition?: TransitionType;
}

const DivStyledAsH4 = divWithClassName("h4");
DivStyledAsH4.displayName = "DivStyledAsH4";

const AlertHeading = createWithBsPrefix("alert-heading", {
  Component: DivStyledAsH4,
});

const AlertLink = createWithBsPrefix("alert-link", {
  Component: Anchor,
});

const propTypes = {
  bsPrefix: PropTypes.string,
  variant: PropTypes.string,
  dismissible: PropTypes.bool,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  closeLabel: PropTypes.string,
  closeVariant: PropTypes.oneOf<CloseButtonVariant>(["white"]),
  transition: PropTypes.oneOfType([PropTypes.bool, elementType]),
};

const defaultProps = {
  variant: "primary",
  show: true,
  transition: Fade,
  closeLabel: "Close alert",
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((uncontrolledProps: AlertProps, ref) => {
  const {
    bsPrefix,
    show,
    closeLabel,
    closeVariant,
    className,
    children,
    variant,
    onClose,
    dismissible,
    transition,
    ...props
  } = useUncontrolled(uncontrolledProps, {
    show: "onClose",
  });

  const prefix = useBootstrapPrefix(bsPrefix, "alert");
  const handleClose = useEventCallback(e => {
    if (onClose) {
      onClose(false, e);
    }
  });
  const Transition = transition === true ? Fade : transition;
  const alert = (
    <div
      role="alert"
      {...(!Transition ? props : undefined)}
      ref={ref}
      className={classNames(
        className,
        prefix,
        variant && `${prefix}-${variant}`,
        dismissible && `${prefix}-dismissible`,
      )}
    >
      {dismissible && (
        <CloseButton onClick={handleClose} aria-label={closeLabel} variant={closeVariant} />
      )}
      {children}
    </div>
  );

  if (!Transition) return show ? alert : null;

  return (
    <Transition unmountOnExit {...props} ref={undefined} in={show}>
      {alert}
    </Transition>
  );
});

Alert.displayName = "Alert";
Alert.defaultProps = defaultProps;
Alert.propTypes = propTypes;

export default Object.assign(Alert, {
  Link: AlertLink,
  Heading: AlertHeading,
});
