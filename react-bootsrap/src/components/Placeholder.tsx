import * as React from "react";
import PropTypes from "prop-types";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "./helpers";
import usePlaceholder, { UsePlaceholderProps } from "./usePlaceholder";
import PlaceholderButton from "./PlaceholderButton";

export interface PlaceholderProps extends UsePlaceholderProps, BsPrefixProps {}

const propTypes = {
  bsPrefix: PropTypes.string,
  animation: PropTypes.string,
  bg: PropTypes.string,
  size: PropTypes.string,
};

const Placeholder: BsPrefixRefForwardingComponent<"span", PlaceholderProps> = React.forwardRef<
  HTMLElement,
  PlaceholderProps
>(({ as: Component = "span", ...props }, ref) => {
  const placeholderProps = usePlaceholder(props);

  return <Component {...placeholderProps} ref={ref} />;
});

Placeholder.displayName = "Placeholder";
Placeholder.propTypes = propTypes;

export default Object.assign(Placeholder, {
  Button: PlaceholderButton,
});
