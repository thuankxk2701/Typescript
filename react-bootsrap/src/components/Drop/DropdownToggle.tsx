import classNames from "classnames";
import * as React from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useDropdownToggle } from "@restart/ui/DropdownToggle";
import DropdownContext from "@restart/ui/DropdownContext";
import useMergedRefs from "@restart/hooks/useMergedRefs";
import Button, { ButtonProps, CommonButtonProps } from "../Button";
import InputGroupContext from "../InputGroupContext";
import { useBootstrapPrefix } from "../ThemeProvider";
import useWrappedRefWithWarning from "../useWrappedRefWithWarning";
import { BsPrefixRefForwardingComponent } from "../helpers";

export interface DropdownToggleProps extends Omit<ButtonProps, "as"> {
  as?: React.ElementType;
  split?: boolean;
  childBsPrefix?: string;
}

type DropdownToggleComponent = BsPrefixRefForwardingComponent<"button", DropdownToggleProps>;

export type PropsFromToggle = Partial<
  Pick<React.ComponentPropsWithRef<DropdownToggleComponent>, CommonButtonProps>
>;

const propTypes = {
  bsPrefix: PropTypes.string,
  id: PropTypes.string,
  split: PropTypes.bool,
  as: PropTypes.elementType,
  childBsPrefix: PropTypes.string,
};

const DropdownToggle: DropdownToggleComponent = React.forwardRef(
  (
    {
      bsPrefix,
      split,
      className,
      childBsPrefix,
      as: Component = Button,
      ...props
    }: DropdownToggleProps,
    ref,
  ) => {
    const prefix = useBootstrapPrefix(bsPrefix, "dropdown-toggle");
    const dropdownContext = useContext(DropdownContext);
    const isInputGroup = useContext(InputGroupContext);
    if (childBsPrefix !== undefined) {
      (props as any).bsPrefix = childBsPrefix;
    }

    const [toggleProps] = useDropdownToggle();
    toggleProps.ref = useMergedRefs(
      toggleProps.ref,
      useWrappedRefWithWarning(ref, "DropdownToggle"),
    );

    return (
      <Component
        className={classNames(
          className,
          prefix,
          split && `${prefix}-split`,
          !!isInputGroup && dropdownContext?.show && "show",
        )}
        {...toggleProps}
        {...props}
      />
    );
  },
);

DropdownToggle.displayName = "DropdownToggle";
DropdownToggle.propTypes = propTypes;

export default DropdownToggle;
