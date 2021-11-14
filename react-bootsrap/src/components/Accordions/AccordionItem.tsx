import classNames from "classnames";
import * as React from "react";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { useBootstrapPrefix } from "../ThemeProvider";
import AccordionItemContext, { AccordionItemContextValue } from "./AccordionItemContext";
import { BsPrefixRefForwardingComponent, BsPrefixProps } from "../helpers";

export interface AccordionItemProps extends BsPrefixProps, React.HTMLAttributes<HTMLElement> {
  eventKey: string;
}
const propTypes = {
  as: PropTypes.elementType,
  bsPrefix: PropTypes.string,
  eventKey: PropTypes.string.isRequired,
};

const AccordionItem: BsPrefixRefForwardingComponent<"div", AccordionItemProps> = React.forwardRef<
  HTMLElement,
  AccordionItemProps
>(({ as: Component = "div", bsPrefix, className, eventKey, ...props }, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "accordion-item");
  const contextValue = useMemo<AccordionItemContextValue>(
    () => ({
      eventKey,
    }),
    [eventKey],
  );
  return (
    <AccordionItemContext.Provider value={contextValue}>
      <Component ref={ref} {...props} className={classNames(className, bsPrefix)} />
    </AccordionItemContext.Provider>
  );
});
AccordionItem.propTypes = propTypes;
AccordionItem.displayName = "AccordionItem";

export default AccordionItem;
