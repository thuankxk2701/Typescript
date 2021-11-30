import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Transition, {
  TransitionStatus,
  ENTERED,
  ENTERING,
  EXITING,
} from "react-transition-group/Transition";
import { TransitionCallbacks } from "@restart/ui/types";
import transitionEndListener from "./transitionEndListener";
import { BsPrefixOnlyProps } from "./helpers";
import TransitionWrapper from "./TransitionWrapper";
import { useBootstrapPrefix } from "./ThemeProvider";

export interface OffcanvasTogglingProps extends TransitionCallbacks, BsPrefixOnlyProps {
  className?: string;
  in?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  appear?: boolean;
  timeout?: number;
  children: React.ReactElement;
}

const propTypes = {
  in: PropTypes.bool,
  mountOnEnter: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  appear: PropTypes.bool,
  timeout: PropTypes.number,

  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
};

const defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
};

const transitionStyles = {
  [ENTERING]: "show",
  [ENTERED]: "show",
};

const OffcanvasToggling = React.forwardRef<Transition<any>, OffcanvasTogglingProps>(
  ({ bsPrefix, className, children, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, "offcanvas");

    return (
      <TransitionWrapper
        ref={ref}
        addEndListener={transitionEndListener}
        {...props}
        childRef={(children as any).ref}
      >
        {(status: TransitionStatus, innerProps: Record<string, unknown>) =>
          React.cloneElement(children, {
            ...innerProps,
            className: classNames(
              className,
              children.props.className,
              (status === ENTERING || status === EXITING) && `${bsPrefix}-toggling`,
              transitionStyles[status],
            ),
          })
        }
      </TransitionWrapper>
    );
  },
);

OffcanvasToggling.propTypes = propTypes as any;
OffcanvasToggling.defaultProps = defaultProps;
OffcanvasToggling.displayName = "OffcanvasToggling";

export default OffcanvasToggling;
