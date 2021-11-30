import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import useEventCallback from "@restart/hooks/useEventCallback";
import { useCallback, useContext, useMemo, useRef } from "react";
import BaseModal, { ModalProps as BaseModalProps, ModalHandle } from "@restart/ui/Modal";
import Fade from "./Fade";
import OffcanvasBody from "./OffcanvasBody";
import OffcanvasToggling from "./OffcanvasToggling";
import ModalContext from "./Modal/ModalContext";
import NavbarContext from "./Navbar/NavbarContext";
import OffcanvasHeader from "./OffcanvasHeader";
import OffcanvasTitle from "./OffcanvasTitle";
import { BsPrefixRefForwardingComponent } from "./helpers";
import { useBootstrapPrefix } from "./ThemeProvider";
import BootstrapModalManager, { getSharedManager } from "./BootstrapModalManager";

export type OffcanvasPlacement = "start" | "end" | "top" | "bottom";

export interface OffcanvasProps
  extends Omit<
    BaseModalProps,
    "role" | "renderBackdrop" | "renderDialog" | "transition" | "backdrop" | "backdropTransition"
  > {
  bsPrefix?: string;
  backdropClassName?: string;
  scroll?: boolean;
  placement?: OffcanvasPlacement;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  backdrop: PropTypes.bool,
  backdropClassName: PropTypes.string,
  keyboard: PropTypes.bool,
  scroll: PropTypes.bool,
  placement: PropTypes.oneOf(["start", "end", "top", "bottom"]),
  autoFocus: PropTypes.bool,
  enforceFocus: PropTypes.bool,
  restoreFocus: PropTypes.bool,
  restoreFocusOptions: PropTypes.shape({
    preventScroll: PropTypes.bool,
  }),
  show: PropTypes.bool,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
  onEscapeKeyDown: PropTypes.func,

  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,

  container: PropTypes.any,
  "aria-labelledby": PropTypes.string,
};

const defaultProps: Partial<OffcanvasProps> = {
  show: false,
  backdrop: true,
  keyboard: true,
  scroll: false,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  placement: "start",
};

function DialogTransition(props: any) {
  return <OffcanvasToggling {...props} />;
}
function BackdropTransition(props: any) {
  return <Fade {...props} />;
}

const Offcanvas: BsPrefixRefForwardingComponent<"div", OffcanvasProps> = React.forwardRef<
  ModalHandle,
  OffcanvasProps
>(
  (
    {
      bsPrefix,
      className,
      children,
      "aria-labelledby": ariaLabelledby,
      placement,
      show,
      backdrop,
      keyboard,
      scroll,
      onEscapeKeyDown,
      onShow,
      onHide,
      container,
      autoFocus,
      enforceFocus,
      restoreFocus,
      restoreFocusOptions,
      onEntered,
      onExit,
      onExiting,
      onEnter,
      onEntering,
      onExited,
      backdropClassName,
      manager: propsManager,
      ...props
    },
    ref,
  ) => {
    const modalManager = useRef<BootstrapModalManager>();
    bsPrefix = useBootstrapPrefix(bsPrefix, "offcanvas");
    const { onToggle } = useContext(NavbarContext) || {};
    const handleHide = useEventCallback(() => {
      onToggle?.();
      onHide?.();
    });

    const modalContext = useMemo(
      () => ({
        onHide: handleHide,
      }),
      [handleHide],
    );

    function getModalManager() {
      if (propsManager) return propsManager;
      if (scroll) {
        if (!modalManager.current)
          modalManager.current = new BootstrapModalManager({
            handleContainerOverflow: false,
          });
        return modalManager.current;
      }
      return getSharedManager();
    }
    const handleEnter = (node: any, ...args: any) => {
      if (node) node.style.visibility = "visible";
      onEnter?.(node, ...args);
    };

    const handleExited = (node: any, ...args: any) => {
      if (node) node.style.visibility = "";
      onExited?.(...args);
    };
    const renderBackdrop = useCallback(
      backdropProps => (
        <div {...backdropProps} className={classNames(`${bsPrefix}-backdrop`, backdropClassName)} />
      ),
      [backdropClassName, bsPrefix],
    );

    const renderDialog = (dialogProps: any) => (
      <div
        role="dialog"
        {...dialogProps}
        {...props}
        className={classNames(className, bsPrefix, `${bsPrefix}-${placement}`)}
        aria-labelledby={ariaLabelledby}
      >
        {children}
      </div>
    );

    return (
      <ModalContext.Provider value={modalContext}>
        <BaseModal
          show={show}
          ref={ref}
          backdrop={backdrop}
          container={container}
          keyboard={keyboard}
          autoFocus={autoFocus}
          enforceFocus={enforceFocus && !scroll}
          restoreFocus={restoreFocus}
          restoreFocusOptions={restoreFocusOptions}
          onEscapeKeyDown={onEscapeKeyDown}
          onShow={onShow}
          onHide={handleHide}
          onEnter={handleEnter}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          onExited={handleExited}
          manager={getModalManager()}
          transition={DialogTransition}
          backdropTransition={BackdropTransition}
          renderBackdrop={renderBackdrop}
          renderDialog={renderDialog}
        />
      </ModalContext.Provider>
    );
  },
);

Offcanvas.displayName = "Offcanvas";
Offcanvas.propTypes = propTypes;
Offcanvas.defaultProps = defaultProps;

export default Object.assign(Offcanvas, {
  Body: OffcanvasBody,
  Header: OffcanvasHeader,
  Title: OffcanvasTitle,
});
