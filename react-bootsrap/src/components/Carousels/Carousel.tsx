import { useEventCallback, useCommittedRef } from "@restart/hooks";
import useUpdateEffect from "@restart/hooks/useUpdateEffect";
import useTimeout from "@restart/hooks/useTimeout";
import Anchor from "@restart/ui/Anchor";
import classNames from "classnames";
import { TransitionStatus } from "react-transition-group/Transition";
import PropTypes, { element } from "prop-types";
import * as React from "react";
import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { uncontrollable, useUncontrolled, useUncontrolledProp } from "uncontrollable";
import CarouselCaption from "./CarouselCaption";
import CarouselItem from "./CarouselItem";
import { map, forEach } from "../ElementChildren";
import { useBootstrapPrefix, useIsRTL } from "../ThemeProvider";
import transitionEndListener from "../transitionEndListener";
import triggerBrowserReflow from "../triggerBrowserReflow";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";
import TransitionWrapper from "../TransitionWrapper";

export type CarouselVariant = "dark";

export interface CarouselRef {
  element?: HTMLElement;
  prev: (e?: React.SyntheticEvent) => void;
  next: (e?: React.SyntheticEvent) => void;
}

export interface CarouselProps
  extends BsPrefixProps,
    Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  slide?: boolean;
  fade?: boolean;
  controls?: boolean;
  indicators?: boolean;
  indicatorLabels?: string[];
  activeIndex?: number;
  onSelect?: (eventKey: number, event: Record<string, unknown> | null) => void;
  defaultActiveIndex?: number;
  onSlide?: (eventKey: number, direction: "start" | "end") => void;
  onSlid?: (eventKey: number, direction: "start" | "end") => void;
  interval?: number | null;
  keyboard?: boolean;
  pause?: "hover" | false;
  wrap?: boolean;
  touch?: boolean;
  prevIcon?: React.ReactNode;
  prevLabel?: React.ReactNode;
  nextIcon?: React.ReactNode;
  nextLabel?: React.ReactNode;
  ref?: React.Ref<CarouselRef>;
  variant?: CarouselVariant;
}
const SWIPE_THRESHOLD = 40;

const propTypes = {
  bsPrefix: PropTypes.string,
  as: PropTypes.elementType,
  slide: PropTypes.bool,
  fade: PropTypes.bool,
  controls: PropTypes.bool,
  indicators: PropTypes.bool,
  indicatorLabels: PropTypes.array,
  activeIndex: PropTypes.number,
  onSelect: PropTypes.func,
  onSlide: PropTypes.func,
  onSlid: PropTypes.func,
  interval: PropTypes.number,
  keyboard: PropTypes.bool,
  pause: PropTypes.oneOf(["hover", false]),
  wrap: PropTypes.bool,
  touch: PropTypes.bool,
  prevIcon: PropTypes.node,
  prevLabel: PropTypes.string,
  nextIcon: PropTypes.node,
  nextLabel: PropTypes.string,
  variant: PropTypes.oneOf<CarouselVariant>(["dark"]),
};
const defaultProps = {
  slide: true,
  fade: false,
  controls: true,
  indicators: true,
  indicatorLabels: [],
  defaultActiveIndex: 0,
  interval: 5000,
  keyboard: true,
  pause: "hover" as CarouselProps["pause"],
  wrap: true,
  touch: true,

  prevIcon: <span aria-hidden="true" className="carousel-control-prev-icon" />,
  prevLabel: "Previous",

  nextIcon: <span aria-hidden="true" className="carousel-control-next-icon" />,

  nextLabel: "Next",
};
const isVisible = (element: any) => {
  if (!element || !element.style || !element.parentNode || !element.parentNode.style) {
    return false;
  }
  const elementStyle = getComputedStyle(element);
  return (
    elementStyle.display !== "node" &&
    elementStyle.visibility !== "hidden" &&
    getComputedStyle(element.parentNode).display !== "node"
  );
};

const Carousel: BsPrefixRefForwardingComponent<"div", CarouselProps> = React.forwardRef<
  CarouselRef,
  CarouselProps
>((useUncontrolledProps, ref) => {
  const {
    as: Component = "div",
    bsPrefix,
    slide,
    fade,
    controls,
    indicators,
    indicatorLabels,
    activeIndex,
    onSelect,
    onSlide,
    onSlid,
    interval,
    keyboard,
    onKeyDown,
    pause,
    onMouseOver,
    onMouseOut,
    wrap,
    touch,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    prevIcon,
    prevLabel,
    nextIcon,
    nextLabel,
    variant,
    className,
    children,
    ...props
  } = useUncontrolled(useUncontrolledProps, {
    activeIndex: "onSelect",
  });

  const prefix = useBootstrapPrefix(bsPrefix, "carousel");
  const isRTL = useIsRTL();
  const nextDirectionRef = useRef<string | null>(null);
  const [direction, setDirection] = useState("next");
  const [paused, setPaused] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [renderedActiveIndex, setRenderedActiveIndex] = useState<number>(activeIndex || 0);

  if (!isSliding && activeIndex !== renderedActiveIndex) {
    if (nextDirectionRef.current) {
      setDirection(nextDirectionRef.current);
    } else {
      setDirection((activeIndex || 0) > renderedActiveIndex ? "next" : "prev");
    }
    if (slide) {
      setIsSliding(true);
    }
    setRenderedActiveIndex(activeIndex || 0);
  }
  useEffect(() => {
    if (nextDirectionRef.current) {
      nextDirectionRef.current = null;
    }
  });

  let numChildren = 0;
  let activeChildrenInterval: number | undefined;

  forEach(children, (child, index) => {
    ++numChildren;
    if (index === activeIndex) {
      activeChildrenInterval = child.props.interval as number | undefined;
    }
  });

  const activeChildrenIntervalRef = useCommittedRef(activeChildrenInterval);
  const prev = useCallback(
    (event?) => {
      if (isSliding) {
        return;
      }
      let nextActiveIndex = renderedActiveIndex - 1;
      if (nextActiveIndex < 0) {
        if (!wrap) {
          return;
        }
        nextActiveIndex = 0;
      }
      nextDirectionRef.current = "prev";
      onSelect?.(nextActiveIndex, event);
    },
    [isSliding, renderedActiveIndex, onSelect, wrap, numChildren],
  );

  const next = useEventCallback((event?) => {
    if (isSliding) {
      return;
    }

    let nextActiveIndex = renderedActiveIndex + 1;
    if (nextActiveIndex >= numChildren) {
      if (!wrap) {
        return;
      }

      nextActiveIndex = 0;
    }

    nextDirectionRef.current = "next";

    onSelect?.(nextActiveIndex, event);
  });

  const elementRef = useRef<HTMLElement>();

  useImperativeHandle(ref, () => ({
    element: elementRef.current,
    prev,
    next,
  }));

  const nextWhenVisible = useEventCallback(() => {
    if (!document.hidden && isVisible(elementRef.current)) {
      if (isRTL) {
        prev();
      } else {
        next();
      }
    }
  });

  const slideDirection = direction === "next" ? "start" : "end";

  useUpdateEffect(() => {
    if (slide) {
      return;
    }
    onSlide?.(renderedActiveIndex, slideDirection);
    onSlid?.(renderedActiveIndex, slideDirection);
  }, [renderedActiveIndex]);

  const orderClassName = `${prefix}-item-${direction}`;
  const directionalClassName = `${prefix}-item-${slideDirection}`;

  const handleEntered = useCallback(() => {
    setIsSliding(false);

    onSlid?.(renderedActiveIndex, slideDirection);
  }, [onSlid, renderedActiveIndex, slideDirection]);

  const handleKeyDown = useCallback(
    event => {
      if (keyboard && !/input|textarea/i.test(event.target.tagName)) {
        switch (event.key) {
          case "ArrowLeft":
            event.preventDefault();
            if (isRTL) {
              next(event);
            } else {
              prev(event);
            }
            return;
          case "ArrowRight":
            event.preventDefault();
            if (isRTL) {
              prev(event);
            } else {
              next(event);
            }
            return;
          default:
        }
      }

      onKeyDown?.(event);
    },
    [keyboard, onKeyDown, prev, next, isRTL],
  );

  const handleMouseOver = useCallback(
    event => {
      if (pause === "hover") {
        setPaused(true);
      }

      onMouseOver?.(event);
    },
    [pause, onMouseOver],
  );

  const handleMouseOut = useCallback(
    event => {
      setPaused(false);

      onMouseOut?.(event);
    },
    [onMouseOut],
  );

  const touchStartXRef = useRef(0);
  const touchDeltaXRef = useRef(0);
  const touchUnpauseTimeout = useTimeout();

  const handleTouchStart = useCallback(
    event => {
      touchStartXRef.current = event.touches[0].clientX;
      touchDeltaXRef.current = 0;

      if (pause === "hover") {
        setPaused(true);
      }
      onTouchStart?.(event);
    },
    [pause, onTouchStart],
  );

  const handleTouchMove = useCallback(
    event => {
      if (event.touches && event.touches.length > 1) {
        touchDeltaXRef.current = 0;
      } else {
        touchDeltaXRef.current = event.touches[0].clientX - touchStartXRef.current;
      }

      onTouchMove?.(event);
    },
    [onTouchMove],
  );

  const handleTouchEnd = useCallback(
    event => {
      if (touch) {
        const touchDeltaX = touchDeltaXRef.current;
        if (Math.abs(touchDeltaX) > SWIPE_THRESHOLD) {
          if (touchDeltaX > 0) {
            prev(event);
          } else {
            next(event);
          }
        }
      }

      if (pause === "hover") {
        touchUnpauseTimeout.set(() => {
          setPaused(false);
        }, interval || undefined);
      }

      onTouchEnd?.(event);
    },
    [touch, pause, prev, next, touchUnpauseTimeout, interval, onTouchEnd],
  );

  const shouldPlay = interval != null && !pause && !isSliding;
  const intervalHandleRef = useRef<number | null>();
  useEffect(() => {
    if (!shouldPlay) {
      return undefined;
    }
    const nextFunc = isRTL ? prev : next;

    intervalHandleRef.current = window.setInterval(
      document.visibilityState ? nextWhenVisible : nextFunc,
      activeChildrenIntervalRef.current ?? interval ?? undefined,
    );

    return () => {
      if (intervalHandleRef.current !== null) {
        clearInterval(intervalHandleRef.current);
      }
    };
  }, [shouldPlay, prev, next, activeChildrenIntervalRef, interval, nextWhenVisible, isRTL]);

  const indicatorOnClicks = useMemo(
    () =>
      indicators &&
      Array.from({ length: numChildren }, (_, index) => (event: any) => {
        onSelect?.(index, event);
      }),
    [indicators, numChildren, onSelect],
  );

  return (
    <Component
      ref={element}
      {...props}
      onKeyDown={handleKeyDown}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      className={classNames(
        className,
        prefix,
        slide && "slide",
        fade && `${prefix}-fade`,
        variant && `${prefix}-${variant}`,
      )}
    >
      {indicators && (
        <div className={`${prefix}-indicators`}>
          {map(children, (_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target=""
              aria-label={indicatorLabels?.length ? indicatorLabels[index] : `Slide ${index + 1}`}
              className={index === renderedActiveIndex ? "active" : undefined}
              onClick={indicatorOnClicks ? indicatorOnClicks[index] : undefined}
              aria-current={index === renderedActiveIndex}
            />
          ))}
        </div>
      )}

      <div className={`${prefix}-inner`}>
        {map(children, (child, index) => {
          const isActive = index === renderedActiveIndex;

          return slide ? (
            <TransitionWrapper
              in={isActive}
              onEnter={isActive ? handleEntered : undefined}
              onEntered={isActive ? handleEntered : undefined}
              addEndListener={transitionEndListener}
            >
              {(status: TransitionStatus, innerProps: Record<string, unknown>) =>
                React.cloneElement(child, {
                  ...innerProps,
                  className: classNames(
                    child.props.className,
                    isActive && status !== "entered" && orderClassName,
                    (status === "entered" || status === "entering") && "active",
                    (status === "entering" || status === "exiting") && directionalClassName,
                  ),
                })
              }
            </TransitionWrapper>
          ) : (
            React.cloneElement(child, {
              className: classNames(child.props.className, isActive && "active"),
            })
          );
        })}
      </div>
      {controls && (
        <>
          {(wrap || activeIndex !== 0) && (
            <Anchor className={`${prefix}-control-prev`} onClick={prev}>
              {prevIcon}
              {prevLabel && <span className="visually-hidden">{prevLabel}</span>}
            </Anchor>
          )}
          {(wrap || activeIndex !== numChildren - 1) && (
            <Anchor className={`${prefix}-control-next`} onClick={next}>
              {nextIcon}
              {nextLabel && <span className="visually-hidden">{nextLabel}</span>}
            </Anchor>
          )}
        </>
      )}
    </Component>
  );
});

Carousel.displayName = "Carousel";
Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

export default Object.assign(Carousel, {
  Caption: CarouselCaption,
  Item: CarouselItem,
});
