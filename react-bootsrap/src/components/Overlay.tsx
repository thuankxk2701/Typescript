import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useRef } from "react";
import BaseOverlay, {
  OverlayProps as BaseOverlayProps,
  OverlayArrowProps,
} from "@restart/ui/Overlay";
import { componentOrElement, elementType } from "prop-types-extra";
import useMergedRefs from "@restart/hooks/useMergedRefs";
import useOverlayOffset from "./useOverlayOffset";
import Fade from "./Fade";
import { TransitionType } from "./helpers";
import { Placement, RootCloseEvent } from "./types";
import safeFindDOMNode from "./safeFindDOMNode";

export interface OverlayInjectedProps {
  ref: React.RefCallback<HTMLElement>;
  style: React.CSSProperties;
  "aria-labelledby"?: string;

  arrowProps: Partial<OverlayArrowProps>;

  show: boolean;
  placement: Placement | undefined;
  popper: {
    state: any;
    outOfBoundaries: boolean;
    placement: Placement | undefined;
    scheduleUpdate?: () => void;
  };
  [prop: string]: any;
}

export type OverlayChildren =
  | React.ReactElement<OverlayInjectedProps>
  | ((injected: OverlayInjectedProps) => React.ReactNode);

export interface OverlayProps
  extends Omit<BaseOverlayProps, "children" | "transition" | "rootCloseEvent"> {
  children: OverlayChildren;
  transition?: TransitionType;
  placement?: Placement;
  rootCloseEvent?: RootCloseEvent;
}

const propTypes = {
  container: PropTypes.oneOfType([componentOrElement, PropTypes.func]),
  target: PropTypes.oneOfType([componentOrElement, PropTypes.func]),
  show: PropTypes.bool,
  popperConfig: PropTypes.object,
  rootClose: PropTypes.bool,
  rootCloseEvent: PropTypes.oneOf<RootCloseEvent>(["click", "mousedown"]),
  onHide: PropTypes.func,
  transition: PropTypes.oneOfType([PropTypes.bool, elementType]),
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  placement: PropTypes.oneOf<Placement>([
    "auto-start",
    "auto",
    "auto-end",
    "top-start",
    "top",
    "top-end",
    "right-start",
    "right",
    "right-end",
    "bottom-end",
    "bottom",
    "bottom-start",
    "left-end",
    "left",
    "left-start",
  ]),
};

const defaultProps: Partial<OverlayProps> = {
  transition: Fade,
  rootClose: false,
  show: false,
  placement: "top",
};

function wrapRefs(props: any, arrowProps: any) {
  const { ref } = props;
  const { ref: aRef } = arrowProps;

  props.ref = ref.__wrapped || (ref.__wrapped = r => ref(safeFindDOMNode(r)));
  arrowProps.ref = aRef.__wrapped || (aRef.__wrapped = r => aRef(safeFindDOMNode(r)));
}
const Overlay = React.forwardRef<HTMLElement, OverlayProps>(
  ({ children: overlay, transition, popperConfig = {}, ...outerProps }, outerRef: any) => {
    const popperRef = useRef({});
    const [ref, modifiers] = useOverlayOffset();
    const mergedRef = useMergedRefs(outerRef, ref);

    const actualTransition = transition === true ? Fade : transition || undefined;

    return (
      <BaseOverlay
        {...outerProps}
        ref={mergedRef}
        popperConfig={{
          ...popperConfig,
          modifiers: modifiers.concat(popperConfig.modifiers || []),
        }}
        transition={actualTransition}
      >
        {(overlayProps, { arrowProps, placement, popper: popperObj, show }) => {
          wrapRefs(overlayProps, arrowProps);
          const popper = Object.assign(popperRef.current, {
            state: popperObj?.state,
            scheduleUpdate: popperObj?.update,
            placement,
            outOfBoundaries: popperObj?.state?.modifiersData.hide?.isReferenceHidden || false,
          });

          if (typeof overlay === "function")
            return overlay({
              ...overlayProps,
              placement,
              show,
              ...(!transition && show && { className: "show" }),
              popper,
              arrowProps,
            });

          return React.cloneElement(overlay as React.ReactElement, {
            ...overlayProps,
            placement,
            arrowProps,
            popper,
            className: classNames(
              (overlay as React.ReactElement).props.className,
              !transition && show && "show",
            ),
            style: {
              ...(overlay as React.ReactElement).props.style,
              ...overlayProps.style,
            },
          });
        }}
      </BaseOverlay>
    );
  },
);

Overlay.displayName = "Overlay";
Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;

export default Overlay;
