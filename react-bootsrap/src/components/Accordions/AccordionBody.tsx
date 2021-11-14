import classNames from "classnames";
import * as React from "react";
import { useContext } from "react";
import PropTypes from "prop-types";
import { useBootstrapPrefix } from "../ThemeProvider";
import AccordionCollapse from "./AccordionCollapse";
import AccordionItemContext from "./AccordionItemContext";
import { BsPrefixRefForwardingComponent, BsPrefixProps } from "../helpers";

export interface AccordionBodyProps extends BsPrefixProps, React.HTMLAttributes<HTMLElement> {}

const propTypes = {
  as: PropTypes.elementType,
  bsPrefix: PropTypes.string,
};

const AccordionBody: BsPrefixRefForwardingComponent<"div", AccordionBodyProps> = React.forwardRef<
  HTMLElement,
  AccordionBodyProps
>(({ as: Component = "div", bsPrefix, className, ...props }, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "accordion-body");
  const { eventKey } = useContext(AccordionItemContext);
  return (
    <AccordionCollapse eventKey={eventKey}>
      <Component ref={ref} {...props} className={classNames(className, bsPrefix)} />
    </AccordionCollapse>
  );
});

AccordionBody.propTypes = propTypes;
AccordionBody.displayName = "AccordionBody";

export default AccordionBody;
