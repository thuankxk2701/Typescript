import classNames from "classnames";
import * as React from "react";
import { useContext } from "react";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";
import { useBootstrapPrefix } from "../ThemeProvider";
import Collapse, { CollapseProps } from "../Collapse";
import AccordionContext from "./AccordionContext";
import { BsPrefixRefForwardingComponent, BsPrefixProps } from "../helpers";

export interface AccordionCollapseProps extends BsPrefixProps, CollapseProps {
  eventKey: string;
}

const propTypes = {
  as: PropTypes.elementType,
  eventKey: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

const AccordionCollapse: BsPrefixRefForwardingComponent<"div", AccordionCollapseProps> =
  React.forwardRef<Transition<any>, AccordionCollapseProps>(
    ({ as: Component = "div", bsPrefix, className, children, eventKey, ...props }, ref) => {
      const { activeEventKey } = useContext(AccordionContext);
      bsPrefix = useBootstrapPrefix(bsPrefix, "accordion-collapse");
      return (
        <Collapse
          ref={ref}
          in={activeEventKey === eventKey}
          {...props}
          className={classNames(className, bsPrefix)}
        >
          <Component>{React.Children.only(children)}</Component>
        </Collapse>
      );
    },
  ) as any;

AccordionCollapse.propTypes = propTypes;
AccordionCollapse.displayName = "AccordionCollapse";

export default AccordionCollapse;
