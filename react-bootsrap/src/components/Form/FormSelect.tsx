import classNames from "classnames";
import * as React from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useBootstrapPrefix } from "../ThemeProvider";
import { BsPrefixOnlyProps, BsPrefixRefForwardingComponent } from "../helpers";
import FormContext from "./FormContext";

export interface FormSelectProps
  extends BsPrefixOnlyProps,
    Omit<React.SelectHTMLAttributes<HTMLElement>, "size"> {
  htmlSize?: number;
  size?: "sm" | "lg";
  isValid?: boolean;
  isInvalid?: boolean;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  size: PropTypes.string,
  htmlSize: PropTypes.number,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  isValid: PropTypes.bool,
  isInvalid: PropTypes.bool,
};

const FormSelect: BsPrefixRefForwardingComponent<"select", FormSelectProps> = React.forwardRef<
  HTMLSelectElement,
  FormSelectProps
>(
  (
    { bsPrefix, size, htmlSize, className, isValid = false, isInvalid = false, id, ...props },
    ref,
  ) => {
    const { controlId } = useContext(FormContext);
    bsPrefix = useBootstrapPrefix(bsPrefix, "form-select");
    return (
      <select
        {...props}
        size={htmlSize}
        ref={ref}
        className={classNames(
          className,
          bsPrefix,
          size && `${bsPrefix}-${size}`,
          isValid && `is-valid`,
          isInvalid && `is-invalid`,
        )}
        id={id || controlId}
      />
    );
  },
);

FormSelect.displayName = "FormSelect";
FormSelect.propTypes = propTypes;

export default FormSelect;
