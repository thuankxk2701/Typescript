import classNames from "classnames";
import css from "dom-helpers/css";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import Transition, {
  TransitionStatus,
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from "react-transition-group/Transition";
import { TransitionCallbacks } from "@restart/ui/types";
import transitionEndListener from "./transitionEndListener";
import createChainedFunction from "./createChainedFunction";
import triggerBrowserReflow from "./triggerBrowserReflow";
import TransitionWrapper from "./TransitionWrapper";

type Dimension = "height" | "width";

export interface CollapseProps
  extends TransitionCallbacks,
    Pick<React.HTMLAttributes<HTMLElement>, "role"> {
  className?: string;
  in?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  appear?: boolean;
  timeout?: number;
  dimension?: Dimension | (() => Dimension);
  getDimensionValue?: (dimension: Dimension, element: HTMLElement) => number;
  children: React.ReactElement;
}

const MARGINS: { [d in Dimension]: string[] } = {
  height: ["marginTop", "marginBottom"],
  width: ["marginLeft", "marginRight"],
};

function getDefaultDimensionValue(dimension: Dimension, elem: any): number {
  const offset = `offset${dimension[0].toUpperCase()}${dimension.slice(1)}`;
  const value = elem[offset];
  const margins = MARGINS[dimension];

  return (
    value +
    // @ts-ignore
    parseInt(css(elem, margins[0]), 10) +
    // @ts-ignore
    parseInt(css(elem, margins[1]), 10)
  );
}

const collapseStyles = {
  [EXITED]: "collapse",
  [EXITING]: "collapsing",
  [ENTERING]: "collapsing",
  [ENTERED]: "collapse show",
};

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
  dimension: PropTypes.oneOfType([PropTypes.oneOf(["height", "width"]), PropTypes.func]),
  getDimensionValue: PropTypes.func,
  role: PropTypes.string,
  children: PropTypes.element.isRequired,
};

const defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  getDimensionValue: getDefaultDimensionValue,
};

const Collapse = React.forwardRef<Transition<any>, CollapseProps>(
  (
    {
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      className,
      children,
      dimension = "height",
      getDimensionValue = getDefaultDimensionValue,
      ...props
    },
    ref,
  ) => {
    const computedDimension = typeof dimension === "function" ? dimension() : dimension;
    const handleEnter = useMemo(
      () =>
        createChainedFunction((elem: any) => {
          elem.style[computedDimension] = "0";
        }, onEnter),
      [computedDimension, onEnter],
    );
    const handleEntering = useMemo(
      () =>
        createChainedFunction((elem: any) => {
          const scroll = `scroll${computedDimension[0].toUpperCase()}${computedDimension.slice(1)}`;
          elem.style[computedDimension] = `${elem[scroll]}px`;
        }, onEntering),
      [computedDimension, onEntering],
    );
    const handleEntered = useMemo(
      () =>
        createChainedFunction((elem: any) => {
          elem.style[computedDimension] = null;
        }, onEntered),
      [computedDimension, onEntered],
    );
    const handleExit = useMemo(
      () =>
        createChainedFunction((elem: any) => {
          elem.style[computedDimension] = `${getDimensionValue(computedDimension, elem)}px`;
          triggerBrowserReflow(elem);
        }, onExit),
      [onExit, getDimensionValue, computedDimension],
    );
    const handleExiting = useMemo(
      () =>
        createChainedFunction((elem: any) => {
          elem.style[computedDimension] = null;
        }, onExiting),
      [computedDimension, onExiting],
    );
    return (
      <TransitionWrapper
        ref={ref}
        addEndListener={transitionEndListener}
        {...props}
        aria-expanded={props.role ? props.in : null}
        onEnter={handleEnter}
        onEntering={handleEntering}
        onEntered={handleEntered}
        onExit={handleExit}
        onExiting={handleExiting}
        childRef={(children as any).ref}
      >
        {(state: TransitionStatus, innerProps: Record<string, unknown>) =>
          React.cloneElement(children, {
            ...innerProps,
            className: classNames(
              className,
              children.props.className,
              collapseStyles[state],
              computedDimension === "width" && "collapse-horizontal",
            ),
          })
        }
      </TransitionWrapper>
    );
  },
);

// @ts-ignore
Collapse.propTypes = propTypes;
// @ts-ignore
Collapse.defaultProps = defaultProps;

export default Collapse;
