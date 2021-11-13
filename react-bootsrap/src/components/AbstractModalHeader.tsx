import PropTypes from "prop-types";
import * as React from "react";
import { useContext } from "react";
import { useEventCallback } from "@restart/hooks";
import CloseButton, { CloseButtonVariant } from "./CloseButton";
import ModalContext from "./ModalContext";

export interface AbstractModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  closeLabel?: string;
  closeVariant?: CloseButtonVariant;
  closeButton?: boolean;
  onHide?: () => void;
}

const propsTypes = {
  closeLabel: PropTypes.string,
  closeVariant: PropTypes.oneOf<CloseButtonVariant>(["white"]),
  closeButton: PropTypes.bool,
  onHide: PropTypes.func,
};
const defaultProps = {
  closeLabel: "Close",
  closeButton: false,
};

const AbstractModalHeader = React.forwardRef<HTMLDivElement, AbstractModalHeaderProps>(
  ({ closeLabel, closeVariant, closeButton, onHide, children, ...props }, ref) => {
    const context = useContext(ModalContext);
    const handleClick = useEventCallback(() => {
      context?.onHide();
      onHide?.();
    });

    return (
      <div ref={ref} {...props}>
        {children}
        {closeButton && (
          <CloseButton aria-label={closeLabel} variant={closeVariant} onClick={handleClick} />
        )}
      </div>
    );
  },
);
AbstractModalHeader.propTypes = propsTypes;
AbstractModalHeader.defaultProps = defaultProps;

export default AbstractModalHeader;
