import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import NoopTransition from "@restart/ui/NoopTransition";
import SelectableContext from "@restart/ui/SelectableContext";
import TabContext from "@restart/ui/TabContext";
import { useTabPanel } from "@restart/ui/TabPanel";
import { EventKey, TransitionCallbacks } from "@restart/ui/types";
import { useBootstrapPrefix } from "../ThemeProvider";
import getTabTransitionComponent from "../getTabTransitionComponent";
import { BsPrefixProps, BsPrefixRefForwardingComponent, TransitionType } from "../helpers";

export interface TabPaneProps
  extends TransitionCallbacks,
    BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  eventKey?: EventKey;
  active?: boolean;
  transition?: TransitionType;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  as: PropTypes.elementType,
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  active: PropTypes.bool,
  transition: PropTypes.oneOfType([PropTypes.bool, PropTypes.elementType]),
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  mountOnEnter: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  /** @ignore * */
  id: PropTypes.string,
  /** @ignore * */
  "aria-labelledby": PropTypes.string,
};

const TabPane: BsPrefixRefForwardingComponent<"div", TabPaneProps> = React.forwardRef<
  HTMLElement,
  TabPaneProps
>(({ bsPrefix, transition, ...props }, ref) => {
  const [
    { className, as: Component = "div", ...rest },
    {
      isActive,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      mountOnEnter,
      unmountOnExit,
      transition: Transition = NoopTransition,
    },
  ] = useTabPanel({
    ...props,
    transition: getTabTransitionComponent(transition),
  } as any);
  const prefix = useBootstrapPrefix(bsPrefix, "tab-pane");

  return (
    <TabContext.Provider value={null}>
      <SelectableContext.Provider value={null}>
        <Transition
          in={isActive}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          onExited={onExited}
          mountOnEnter={mountOnEnter}
          unmountOnExit={unmountOnExit as any}
        >
          <Component
            {...rest}
            ref={ref}
            className={classNames(className, prefix, bsPrefix, isActive && "active")}
          />
        </Transition>
      </SelectableContext.Provider>
    </TabContext.Provider>
  );
});

TabPane.displayName = "TabPane";
TabPane.propTypes = propTypes;

export default TabPane;
