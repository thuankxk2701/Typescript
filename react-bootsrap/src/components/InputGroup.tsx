import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { useMemo } from "react";

import createWithBsPrefix from "./createWithBsPrefix";
import { useBootstrapPrefix } from "./ThemeProvider";
import FormCheckInput from "./Form/FormCheckInput";
import inputGroupContext from "./InputGroupContext";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "./helpers";

const InputGroupText = createWithBsPrefix("input-group-text", {
  Component: "span",
});

const InputGroupCheckbox = (props: any) => (
  <InputGroupText>
    <FormCheckInput type="checkbox" {...props} />
  </InputGroupText>
);

const InputGroupRadio = (props: any) => (
  <InputGroupText>
    <FormCheckInput type="radio" {...props} />
  </InputGroupText>
);

export interface InputGroupProps extends BsPrefixProps, React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "lg";
  hasValidation?: boolean;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  size: PropTypes.string,
  hasValidation: PropTypes.bool,
  as: PropTypes.elementType,
};

const InputGroup: BsPrefixRefForwardingComponent<"div", InputGroupProps> = React.forwardRef<
  HTMLElement,
  InputGroupProps
>(({ bsPrefix, size, hasValidation, className, as: Component = "div", ...props }, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "input-group");

  const contextValue = useMemo(() => ({}), []);
  return (
    <inputGroupContext.Provider value={contextValue}>
      <Component
        ref={ref}
        {...props}
        className={classNames(
          className,
          bsPrefix,
          size && `${bsPrefix}-${size}`,
          hasValidation && "has-validation",
        )}
      />
    </inputGroupContext.Provider>
  );
});

InputGroup.propTypes = propTypes;
InputGroup.displayName = "InputGroup";

export default Object.assign(InputGroup, {
  Text: InputGroupText,
  Radio: InputGroupRadio,
  Checkbox: InputGroupCheckbox,
});
