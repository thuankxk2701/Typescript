import classNames from "classnames";
import PropTypes from "prop-types";
import * as React from "react";

import { useBootstrapPrefix } from "../ThemeProvider";

import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";

export interface FormTextProps extends BsPrefixProps, React.HTMLAttributes<HTMLElement> {
  muted?: boolean;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  _ref: PropTypes.any,
  muted: PropTypes.bool,
  as: PropTypes.elementType,
};

const FormText: BsPrefixRefForwardingComponent<"small", FormTextProps> = React.forwardRef<
  HTMLElement,
  FormTextProps
>(({ bsPrefix, className, as: Component = "small", muted, ...props }, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "form-text");
  return (
    <Component
      {...props}
      ref={ref}
      className={classNames(className, bsPrefix, muted && "text-muted")}
    />
  );
});

FormText.displayName = "FormText";
FormText.propTypes = propTypes;

export default FormText;
