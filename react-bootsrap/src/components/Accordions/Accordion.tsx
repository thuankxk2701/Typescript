import classNames from "classnames";
import * as React from "react";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { SelectCallback } from "@restart/ui/types";
import { useUncontrolled } from "uncontrollable";
import { useBootstrapPrefix } from "../ThemeProvider";
import AccordionBody from "./AccordionBody";
import AccordionButton from "./AccordionButton";
import AccordionCollapse from "./AccordionCollapse";
import AccordionContext from "./AccordionContext";
import AccordionHeader from "./AccordionHeader";
import AccordionItem from "./AccordionItem";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";
export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect">,
    BsPrefixProps {
  activeKey?: string;
  defaultActiveKey?: string;
  onSelect?: SelectCallback;
  flush?: boolean;
}

const propTypes = {
  as: PropTypes.elementType,
  bsPrefix: PropTypes.string,
  activeKey: PropTypes.string,
  defaultActiveKey: PropTypes.string,
  flush: PropTypes.bool,
};

const Accordion: BsPrefixRefForwardingComponent<"div", AccordionProps> = React.forwardRef<
  HTMLElement,
  AccordionProps
>((props, ref) => {
  const {
    as: Component = "div",
    activeKey,
    bsPrefix,
    className,
    onSelect,
    flush,
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: "onSelect",
  });

  const prefix = useBootstrapPrefix(bsPrefix, "accordion");
  const contextValue = useMemo(
    () => ({
      activeEventKey: activeKey,
      onSelect,
    }),
    [activeKey, onSelect],
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <Component
        ref={ref}
        {...controlledProps}
        className={classNames(className, prefix, flush && `${prefix}-flush`)}
      />
    </AccordionContext.Provider>
  );
});

Accordion.displayName = "Accordion";
Accordion.propTypes = propTypes;

export default Object.assign(Accordion, {
  Button: AccordionButton,
  Collapse: AccordionCollapse,
  Item: AccordionItem,
  Header: AccordionHeader,
  Body: AccordionBody,
});
