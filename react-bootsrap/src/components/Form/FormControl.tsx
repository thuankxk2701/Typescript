import classNames from "classnames";
import PropTypes from "prop-types";
import * as React from "react";
import { useContext } from "react";
import warning from "warning";
import Feedback from "../Feedback";
import FormContext from "./FormContext";
import { useBootstrapPrefix } from "../ThemeProvider";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

export interface FormControlProps extends BsPrefixProps, React.HTMLAttributes<FormControlElement> {
  htmlSize?: number;
  size?: "sm" | "lg";
  plaintext?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  value?: string | string[] | number;
  onChange?: React.ChangeEventHandler<FormControlElement>;
  type?: string;
  isValid?: boolean;
  isInvalid?: boolean;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  _ref: PropTypes.any,
  size: PropTypes.string,
  htmlSize: PropTypes.number,
  as: PropTypes.elementType,
  plaintext: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  type: PropTypes.string,
  id: PropTypes.string,
  isValid: PropTypes.bool,
  isInvalid: PropTypes.bool,
};

const FormControl: BsPrefixRefForwardingComponent<"input", FormControlProps> = React.forwardRef<
  FormControlElement,
  FormControlProps
>(
  (
    {
      bsPrefix,
      type,
      size,
      htmlSize,
      id,
      className,
      isValid = false,
      isInvalid = false,
      plaintext,
      readOnly,
      as: Component = "input",
      ...props
    },
    ref,
  ) => {
    const { controlId } = useContext(FormContext);
    bsPrefix = useBootstrapPrefix(bsPrefix, "form-control");
    let classes;
    if (plaintext) {
      classes = { [`${bsPrefix}-plaintext`]: true };
    } else {
      classes = {
        [bsPrefix]: true,
        [`${bsPrefix}-${size}`]: size,
      };
    }

    warning(
      controlId == null || !id,
      "`controlId` is ignored on `<FormControl>` when `id` is specified.",
    );

    return (
      <Component
        {...props}
        type={type}
        size={htmlSize}
        ref={ref}
        readOnly={readOnly}
        id={id || controlId}
        className={classNames(
          className,
          classes,
          isValid && `is-valid`,
          isInvalid && `is-invalid`,
          type === "color" && `${bsPrefix}-color`,
        )}
      />
    );
  },
);

FormControl.displayName = "FormControl";
FormControl.propTypes = propTypes;

export default Object.assign(FormControl, { Feedback });
