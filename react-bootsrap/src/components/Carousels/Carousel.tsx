import { useEventCallback, useCommittedRef } from "@restart/hooks";
import useUpdateEffect from "@restart/hooks/useUpdateEffect";
import useTimeout from "@restart/hooks/useTimeout";
import Anchor from "@restart/ui/Anchor";
import classNames from "classnames";
import { TransitionStatus } from "react-transition-group/Transition";
import PropTypes from "prop-types";
import * as React from "react";
import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { useUncontrolled } from "uncontrollable";
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
