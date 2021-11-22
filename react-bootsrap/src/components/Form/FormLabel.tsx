import classNames from "classnames";
import PropTypes from "prop-types";
import * as React from "react";
import { useContext } from "react";
import warning from "warning";

import Col, { ColProps } from "../Col";
import FormContext from "./FormContext";
import { useBootstrapPrefix } from "../ThemeProvider";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";

interface FormLabelBaseProps extends BsPrefixProps, React.HTMLAttributes<HTMLElement> {
  htmlFor?: string;
  visuallyHidden?: boolean;
}

export interface FormLabelOwnProps extends FormLabelBaseProps {
  column?: false;
}

export interface FormLabelWithColProps extends FormLabelBaseProps, ColProps {
  column: true | "sm" | "lg";
}

export type FormLabelProps = FormLabelWithColProps | FormLabelOwnProps;

const propTypes = {
  bsPrefix: PropTypes.string,
  htmlFor: PropTypes.string,
  column: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["sm", "lg"])]),
  _ref: PropTypes.any,
  visuallyHidden: PropTypes.bool,
  as: PropTypes.elementType,
};

const defaultProps = {
  column: false,
  visuallyHidden: false,
};

const FormLabel: BsPrefixRefForwardingComponent<"label", FormLabelProps> = React.forwardRef<
  HTMLElement,
  FormLabelProps
>(
  (
    { as: Component = "label", bsPrefix, column, visuallyHidden, className, htmlFor, ...props },
    ref,
  ) => {
    const { controlId } = useContext(FormContext);
    bsPrefix = useBootstrapPrefix(bsPrefix, "form-label");
    let columnClass = "col-form-label";
    if (typeof column === "string") columnClass = `${columnClass} ${columnClass}-${column}`;

    const classes = classNames(
      className,
      bsPrefix,
      visuallyHidden && "visually-hidden",
      column && columnClass,
    );

    warning(
      controlId == null || !htmlFor,
      "`controlId` is ignored on `<FormLabel>` when `htmlFor` is specified.",
    );
    htmlFor = htmlFor || controlId;

    if (column)
      return (
        <Col
          ref={ref as React.ForwardedRef<HTMLLabelElement>}
          as="label"
          className={classes}
          htmlFor={htmlFor}
          {...props}
        />
      );
    return <Component ref={ref} className={classes} htmlFor={htmlFor} {...props} />;
  },
);

FormLabel.displayName = "FormLabel";
FormLabel.propTypes = propTypes;
FormLabel.defaultProps = defaultProps;

export default FormLabel;
