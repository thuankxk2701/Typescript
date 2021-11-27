import * as React from "react";
import PropTypes from "prop-types";
import Tabs, { TabsProps } from "@restart/ui/Tabs";
import getTabTransitionComponent from "../getTabTransitionComponent";
import { TransitionType } from "../helpers";

export interface TabContainerProps extends Omit<TabsProps, "transition"> {
  transition?: TransitionType;
}

const propTypes = {
  id: PropTypes.string,
  transition: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.elementType]),
  mountOnEnter: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  generateChildId: PropTypes.func,
  onSelect: PropTypes.func,
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const TabContainer = ({ transition, ...props }: TabContainerProps) => {
  <Tabs {...props} transition={getTabTransitionComponent(transition)} />;
};

TabContainer.propTypes = propTypes;
TabContainer.displayName = "TabContainer";

export default TabContainer;
