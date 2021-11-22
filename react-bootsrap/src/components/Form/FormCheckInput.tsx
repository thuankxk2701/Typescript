import classNames from "classnames";
import * as React from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import FormContext from "./FormContext";
import { useBootstrapPrefix } from "../ThemeProvider";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";

type FormCheckInputType = "check" | "radio";

export interface FormCheckInputProps
  extends BsPrefixProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  type?: FormCheckInputType;
  isValid?: boolean;
  isInvalid?: boolean;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  as: PropTypes.elementType,
  id: PropTypes.string,
  type: PropTypes.oneOf(["radio", "checkbox"]).isRequired,
  isValid: PropTypes.bool,
  isInvalid: PropTypes.bool,
};

const FormCheckInput: BsPrefixRefForwardingComponent<"input", FormCheckInputProps> =
  React.forwardRef<HTMLInputElement, FormCheckInputProps>(
    (
      {
        id,
        bsPrefix,
        className,
        type = "checkbox",
        isValid = false,
        isInvalid = false,
        as: Component = "input",
        ...props
      },
      ref,
    ) => {
      const { controlId } = useContext(FormContext);
      bsPrefix = useBootstrapPrefix(bsPrefix, "form-check-input");

      return (
        <Component
          {...props}
          ref={ref}
          type={type}
          id={id || controlId}
          className={classNames(
            className,
            bsPrefix,
            isValid && "is-valid",
            isInvalid && "is-invalid",
          )}
        />
      );
    },
  );

FormCheckInput.displayName = "FromCheckInput";
FormCheckInput.propTypes = propTypes;

export default FormCheckInput;
