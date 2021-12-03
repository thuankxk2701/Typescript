import classNames from "classnames";
import PropTypes from "prop-types";
import * as React from "react";
import { useBootstrapPrefix } from "./ThemeProvider";
import Button, { ButtonProps } from "./Button";

export type ToggleButtonType = "checkbox" | "radio";
export interface ToggleButtonProps extends Omit<ButtonProps, "onChange" | "type"> {
  type?: ToggleButtonType;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value: string | ReadonlyArray<string> | number;
  inputRef?: React.Ref<HTMLInputElement>;
}

const noop = () => undefined;

const propTypes = {
  bsPrefix: PropTypes.string,

  type: PropTypes.oneOf<ToggleButtonType>(["checkbox", "radio"]),

  name: PropTypes.string,

  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,

  onChange: PropTypes.func,

  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string.isRequired),
    PropTypes.number,
  ]).isRequired,

  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
};

const ToggleButton = React.forwardRef<HTMLLabelElement, ToggleButtonProps>(
  (
    { bsPrefix, name, className, checked, type, onChange, value, disabled, id, inputRef, ...props },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, "btn-check");

    return (
      <>
        <input
          className={bsPrefix}
          name={name}
          type={type}
          value={value}
          ref={inputRef}
          autoComplete="off"
          checked={!!checked}
          disabled={!!disabled}
          onChange={onChange || noop}
          id={id}
        />
        <Button
          {...props}
          ref={ref}
          className={classNames(className, disabled && "disabled")}
          type={undefined}
          as="label"
          htmlFor={id}
        />
      </>
    );
  },
);

ToggleButton.propTypes = propTypes;
ToggleButton.displayName = "ToggleButton";

export default ToggleButton;