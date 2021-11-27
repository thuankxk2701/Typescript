import * as React from "react";
import PropTypes from "prop-types";
import { ButtonType } from "@restart/ui/Button";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import Dropdown, { DropdownProps } from "./Drop/Dropdown";
import { PropsFromToggle } from "./Drop/DropdownToggle";
import { BsPrefixProps } from "./helpers";
import { alignPropType } from "./types";

export interface SplitButtonProps
  extends Omit<DropdownProps, "title">,
    PropsFromToggle,
    BsPrefixProps {
  menuRole?: string;
  renderMenuOnMount?: boolean;
  rootCloseEvent?: "click" | "mousedown";
  target?: string;
  title: React.ReactNode;
  toggleLabel?: string;
  type?: ButtonType;
}

const propTypes = {
  id: PropTypes.string,
  toggleLabel: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.node.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  align: alignPropType,
  menuRole: PropTypes.string,
  renderMenuOnMount: PropTypes.bool,
  rootCloseEvent: PropTypes.string,
  /** @ignore */
  bsPrefix: PropTypes.string,
  /** @ignore */
  variant: PropTypes.string,
  /** @ignore */
  size: PropTypes.string,
};

const defaultProps: Partial<SplitButtonProps> = {
  toggleLabel: "Toggle dropdown",
  type: "button",
};

const SplitButton = React.forwardRef<HTMLElement, SplitButtonProps>(
  (
    {
      id,
      bsPrefix,
      size,
      variant,
      title,
      type,
      toggleLabel,
      children,
      onClick,
      href,
      target,
      menuRole,
      renderMenuOnMount,
      rootCloseEvent,
      ...props
    },
    ref,
  ) => (
    <Dropdown ref={ref} {...props} as={ButtonGroup}>
      <Button
        size={size}
        variant={variant}
        disabled={props.disabled}
        bsPrefix={bsPrefix}
        href={href}
        target={target}
        onClick={onClick}
        type={type}
      >
        {title}
      </Button>
      <Dropdown.Toggle
        split
        id={id}
        size={size}
        variant={variant}
        disabled={props.disabled}
        childBsPrefix={bsPrefix}
      >
        <span className="visually-hidden">{toggleLabel}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu
        role={menuRole}
        renderOnMount={renderMenuOnMount}
        rootCloseEvent={rootCloseEvent}
      >
        {children}
      </Dropdown.Menu>
    </Dropdown>
  ),
);

SplitButton.propTypes = propTypes as any;
SplitButton.defaultProps = defaultProps;
SplitButton.displayName = "SplitButton";

export default SplitButton;
