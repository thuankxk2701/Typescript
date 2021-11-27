import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { useBootstrapPrefix } from "./ThemeProvider";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "./helpers";
import { GapValue } from "./types";
import createUtilityClassName, {
  ResponsiveUtilityValue,
  responsivePropType,
} from "./createUtilityClasses";

export type StackDirection = "horizontal" | "vertical";

export interface StackProps extends BsPrefixProps, React.HTMLAttributes<HTMLElement> {
  direction?: StackDirection;
  gap?: ResponsiveUtilityValue<GapValue>;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  gap: responsivePropType(PropTypes.number),
};

const Stack: BsPrefixRefForwardingComponent<"span", StackProps> = React.forwardRef<
  HTMLElement,
  StackProps
>(({ as: Component = "div", bsPrefix, className, direction, gap, ...props }, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, direction === "horizontal" ? "hstack" : "vstack");

  return (
    <Component
      {...props}
      ref={ref}
      className={classNames(
        className,
        bsPrefix,
        ...createUtilityClassName({
          gap,
        }),
      )}
    />
  );
});

Stack.displayName = "Stack";
Stack.propTypes = propTypes;

export default Stack;
