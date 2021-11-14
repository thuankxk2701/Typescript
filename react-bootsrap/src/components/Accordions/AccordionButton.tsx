import * as React from "react";
import { useContext } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import AccordionContext from "./AccordionContext";
import AccordionItemContext from "./AccordionItemContext";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";
import { useBootstrapPrefix } from "../ThemeProvider";

type EventHandler = React.EventHandler<React.SyntheticEvent>;

export interface AccordionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    BsPrefixProps {}

const propTypes = {
  as: PropTypes.elementType,
  bsPrefix: PropTypes.string,
  onClick: PropTypes.func,
};
export function useAccordionButton(eventKey: string, onClick?: EventHandler): EventHandler {
  const { activeEventKey, onSelect } = useContext(AccordionContext);

  return e => {
    const eventKeyPassed = eventKey === activeEventKey ? null : eventKey;
    if (onSelect) onSelect(eventKeyPassed, e);
    if (onClick) onClick(e);
  };
}

const AccordionButton: BsPrefixRefForwardingComponent<"div", AccordionButtonProps> =
  React.forwardRef<HTMLButtonElement, AccordionButtonProps>(
    ({ as: Component = "button", bsPrefix, className, onClick, ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, "accordion-button");
      const { eventKey } = useContext(AccordionItemContext);
      const accordionOnClick = useAccordionButton(eventKey, onClick);
      const { activeEventKey } = useContext(AccordionContext);
      if (Component === "button") {
        props.type = "button";
      }

      return (
        <Component
          ref={ref}
          onClick={accordionOnClick}
          {...props}
          aria-expanded={eventKey === activeEventKey}
          className={classNames(className, bsPrefix, eventKey !== activeEventKey && "collapsed")}
        />
      );
    },
  );

AccordionButton.propTypes = propTypes;
AccordionButton.displayName = "AccordionButton";
export default AccordionButton;
