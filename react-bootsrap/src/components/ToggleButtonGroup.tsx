import * as React from "react";
import PropTypes from "prop-types";
import invariant from "invariant";
import { useUncontrolled } from "uncontrollable";

import chainFunction from "./createChainedFunction";
import { map } from "./ElementChildren";
import ButtonGroup, { ButtonGroupProps } from "./ButtonGroup";
import ToggleButton from "./ToggleButton";
import { BsPrefixRefForwardingComponent } from "./helpers";

type BaseToggleButtonProps = Omit<ButtonGroupProps, "toggle" | "defaultValue" | "onChange">;

export interface ToggleButtonRadioProps<T> extends BaseToggleButtonProps {
  type?: "radio";
  name: string;
  value?: T;
  defaultValue?: T;
  onChange?: (value: T, event: any) => void;
}

export interface ToggleButtonCheckboxProps<T> extends BaseToggleButtonProps {
  type: "checkbox";
  name?: string;
  value?: T[];
  defaultValue?: T[];
  onChange?: (value: T[]) => void;
}
export type ToggleButtonGroupProps<T> = ToggleButtonRadioProps<T> | ToggleButtonCheckboxProps<T>;

const propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(["checkbox", "radio"]).isRequired,
  size: PropTypes.string,
  vertical: PropTypes.bool,
};

const defaultProps = {
  type: "radio",
  vertical: false,
};

const ToggleButtonGroup: BsPrefixRefForwardingComponent<
  "a",
  ToggleButtonGroupProps<any>
> = React.forwardRef<HTMLElement, ToggleButtonGroupProps<any>>((props, ref) => {
  const { children, type, name, value, onChange, ...controlledProps } = useUncontrolled(props, {
    value: "onChange",
  });

  const getValues: () => any[] = () => (value == null ? [] : [].concat(value));

  const handleToggle = (inputVal: any, event: any) => {
    if (!onChange) {
      return;
    }
    const values = getValues();
    const isActive = values.indexOf(inputVal) !== -1;

    if (type === "radio") {
      if (!isActive && onChange) onChange(inputVal, event);
      return;
    }

    if (isActive) {
      onChange(
        values.filter(n => n !== inputVal),
        event,
      );
    } else {
      onChange([...values, inputVal], event);
    }
  };

  invariant(
    type !== "radio" || !!name,
    "A `name` is required to group the toggle buttons when the `type` " + 'is set to "radio"',
  );

  return (
    <ButtonGroup {...controlledProps} ref={ref as any}>
      {map(children, child => {
        const values = getValues();
        const { value: childVal, onChange: childOnChange } = child.props;
        const handler = (e: any) => handleToggle(childVal, e);

        return React.cloneElement(child, {
          type,
          name: (child as any).name || name,
          checked: values.indexOf(childVal) !== -1,
          onChange: chainFunction(childOnChange, handler),
        });
      })}
    </ButtonGroup>
  );
});

ToggleButtonGroup.propTypes = propTypes;
ToggleButtonGroup.defaultProps = defaultProps as any;

export default Object.assign(ToggleButtonGroup, {
  Button: ToggleButton,
});
