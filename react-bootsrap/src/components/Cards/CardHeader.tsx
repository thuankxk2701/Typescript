import classNames from "classnames";
import * as React from "react";
import { useMemo } from "react";
import PropTypes from "prop-types";

import { useBootstrapPrefix } from "../ThemeProvider";

import CardHeaderContext from "./CardHeaderContextValue";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";

export interface CardHeaderProps extends BsPrefixProps, React.HTMLAttributes<HTMLElement> {}

const propTypes = {
  bsPrefix: PropTypes.string,
  as: PropTypes.string,
};

const CardHeader: BsPrefixRefForwardingComponent<"div", CardHeaderProps> = React.forwardRef<
  HTMLElement,
  CardHeaderProps
>(({ bsPrefix, className, as: Component = "div", ...props }, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, "card-header");
  const contextValue = useMemo(
    () => ({
      cardHeaderBsPrefix: prefix,
    }),
    [prefix],
  );
  return (
    <CardHeaderContext.Provider value={contextValue}>
      <Component ref={ref} {...props} className={classNames(className, prefix)} />
    </CardHeaderContext.Provider>
  );
});

CardHeader.displayName = "CardHeader";
CardHeader.propTypes = propTypes;

export default CardHeader;
