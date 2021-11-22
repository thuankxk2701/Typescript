import PropTypes from "prop-types";
import * as React from "react";
import { useMemo } from "react";

import FormContext from "./FormContext";

import { AsProp, BsPrefixRefForwardingComponent } from "../helpers";

export interface FormGroupProps extends React.HTMLAttributes<HTMLElement>, AsProp {
  controlId?: string;
}

const propTypes = {
  as: PropTypes.elementType,
  controlId: PropTypes.string,
  _ref: PropTypes.any,
};

const FormGroup: BsPrefixRefForwardingComponent<"div", FormGroupProps> = React.forwardRef(
  ({ controlId, as: Component = "div", ...props }, ref) => {
    const context = useMemo(() => ({ controlId }), [controlId]);

    return (
      <FormContext.Provider value={context}>
        <Component {...props} ref={ref} />
      </FormContext.Provider>
    );
  },
);

FormGroup.displayName = "FormGroup";
FormGroup.propTypes = propTypes;

export default FormGroup;
