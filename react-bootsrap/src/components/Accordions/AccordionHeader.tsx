import classNames from "classnames";
import * as React from "react";
import PropTypes from "prop-types";
import { useBootstrapPrefix } from "../ThemeProvider";
import AccordionButton from "./AccordionButton";
import { BsPrefixRefForwardingComponent, BsPrefixProps } from "../helpers";

export interface AccordionHeaderProps extends BsPrefixProps, React.HTMLAttributes<HTMLElement> {}

const propTypes = {
  as: PropTypes.elementType,
  bsPrefix: PropTypes.string,
  onclick: PropTypes.func,
};

const AccordionHeader: BsPrefixRefForwardingComponent<"h2", AccordionHeaderProps> =
  React.forwardRef<HTMLElement, AccordionHeaderProps>(
    ({ as: Component = "h2", bsPrefix, className, children, onClick, ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, "accordion-header");

      return (
        <Component ref={ref} {...props} className={classNames(className, bsPrefix)}>
          <AccordionButton onClick={onClick}>{children}</AccordionButton>
        </Component>
      );
    },
  );
AccordionHeader.propTypes = propTypes;
AccordionHeader.displayName = "AccordionHeader";

export default AccordionHeader;
