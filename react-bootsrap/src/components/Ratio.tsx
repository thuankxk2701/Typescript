import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { useBootstrapPrefix } from "./ThemeProvider";
import { BsPrefixProps } from "./helpers";

export type AspectRatio = "1x1" | "4x3" | "16x9" | "21x9" | string;

export interface RatioProps extends BsPrefixProps, React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactChild;
  aspectRatio?: AspectRatio | number;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  children: PropTypes.element.isRequired,
  aspectRatio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const defaultProps = {
  aspectRatio: "1x1" as const,
};

function toPercent(num: number): string {
  if (num <= 0 || num > 100) return "100%";
  if (num < 1) return `${num * 100}%`;
  return `${num}%`;
}

const Ratio = React.forwardRef<HTMLDivElement, RatioProps>(
  ({ bsPrefix, className, children, aspectRatio, style, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, "ratio");
    const isCustomRatio = typeof aspectRatio === "number";

    return (
      <div
        ref={ref}
        {...props}
        style={{
          ...style,
          ...(isCustomRatio && {
            "--bs-aspect-ratio": toPercent(aspectRatio as number),
          }),
        }}
        className={classNames(bsPrefix, className, !isCustomRatio && `${bsPrefix}-${aspectRatio}`)}
      >
        {React.Children.only(children)}
      </div>
    );
  },
);

Ratio.propTypes = propTypes;
Ratio.defaultProps = defaultProps;

export default Ratio;
