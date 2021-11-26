import * as React from "react";
import PropTypes from "prop-types";
import { useContext } from "react";

import Collapse, { CollapseProps } from "../Collapse";
import { useBootstrapPrefix } from "../ThemeProvider";
import NavbarContext from "./NavbarContext";
import { BsPrefixProps } from "../helpers";

export interface NavbarCollpaseProps
  extends Omit<CollapseProps, "children">,
    React.HTMLAttributes<HTMLDivElement>,
    BsPrefixProps {}

const propTypes = {
  bsPrefix: PropTypes.string,
};
const NavbarCollapse = React.forwardRef<HTMLDivElement, NavbarCollpaseProps>(
  ({ bsPrefix, children, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, "navbar-collapse");
    const context = useContext(NavbarContext);
    return (
      <Collapse in={!!(context && context.expanded)} {...props}>
        <div ref={ref} className={bsPrefix}>
          {children}
        </div>
      </Collapse>
    );
  },
);

NavbarCollapse.displayName = "NavbarCollapse";
NavbarCollapse.propTypes = propTypes;

export default NavbarCollapse;
