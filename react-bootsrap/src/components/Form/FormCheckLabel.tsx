import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useContext } from "react";
import FormContext from "./FormContext";
import { useBootstrapPrefix } from "../ThemeProvider";
import { BsPrefixProps } from "../helpers";

export interface FormCheckLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    BsPrefixProps {}

const propTypes = {
  bsPrefix: PropTypes.string,
  htmlFor: PropTypes.string,
};

const FormCheckLabel = React.forwardRef<HTMLLabelElement, FormCheckLabelProps>(
  ({ bsPrefix, className, htmlFor, ...props }, ref) => {
    const { controlId } = useContext(FormContext);
    bsPrefix = useBootstrapPrefix(bsPrefix, "form-check-label");

    return (
      <label
        {...props}
        ref={ref}
        htmlFor={htmlFor || controlId}
        className={classNames(className, bsPrefix)}
      />
    );
  },
);

FormCheckLabel.displayName = "FormCheckLabel";
FormCheckLabel.propTypes = propTypes;

export default FormCheckLabel;
