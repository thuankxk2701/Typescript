import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import addEventListener from "dom-helpers/addEventListener";
import canUseDOM from "dom-helpers/canUseDOM";
import ownerDocument from "dom-helpers/ownerDocument";
import removeEventListener from "dom-helpers/removeEventListener";
import getScrollbarSize from "dom-helpers/scrollbarSize";
import useCallbackRef from "@restart/hooks/useCallbackRef";
import useEventCallback from "@restart/hooks/useEventCallback";
import useMergedRefs from "@restart/hooks/useMergedRefs";
import useWillUnmount from "@restart/hooks/useWillUnmount";
import transitionEnd from "dom-helpers/transitionEnd";
import BaseModal, { ModalProps as BaseModalProps } from "@restart/ui/Modal";
import { ModalInstance } from "@restart/ui/ModalManager";
import { getSharedManager } from "../BootstrapModalManager";
import Fade from "../Fade";
import ModalBody from "./ModalBody";
import ModalContext from "./ModalContext";
import ModalDialog from "./ModalDialog";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import ModalTitle from "./ModalTitle";
import { BsPrefixRefForwardingComponent } from "../helpers";
import { useBootstrapPrefix, useIsRTL } from "../ThemeProvider";

export interface ModalProps
  extends Omit<
    BaseModalProps,
    "role" | "renderBackdrop" | "renderDialog" | "transition" | "backdropTransition" | "children"
  > {
  size?: "sm" | "lg" | "xl";
  fullscreen?: true | "sm-down" | "md-down" | "lg-down" | "xl-down" | "xxl-down";
  bsPrefix?: string;
  centered?: boolean;
  backdropClassName?: string;
  animation?: boolean;
  dialogClassName?: string;
  contentClassName?: string;
  dialogAs?: React.ElementType;
  scrollable?: boolean;
  [other: string]: any;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  size: PropTypes.string,
  fullscreen: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  centered: PropTypes.bool,
  backdrop: PropTypes.oneOf(["static", true, false]),
  backdropClassName: PropTypes.string,
  keyboard: PropTypes.bool,
  scrollable: PropTypes.bool,
  animation: PropTypes.bool,
  dialogClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  dialogAs: PropTypes.elementType,
  autoFocus: PropTypes.bool,
  enforceFocus: PropTypes.bool,
  restoreFocus: PropTypes.bool,
  restoreFocusOptions: PropTypes.shape({
    preventScroll: PropTypes.bool,
  }),
  show: PropTypes.bool,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  manager: PropTypes.object,
  container: PropTypes.any,
  "aria-labelledby": PropTypes.any,
};

const defaultProps = {
  show: false,
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  animation: true,
  dialogAs: ModalDialog,
};

function DialogTransition(props: any) {
  return <Fade {...props} timeout={null} />;
}

function BackdropTransition(props: any) {
  return <Fade {...props} timeout={null} />;
}

/* eslint-enable no-use-before-define */
const Modal: BsPrefixRefForwardingComponent<"div", ModalProps> = React.forwardRef(
  (
    {
      bsPrefix,
      className,
      style,
      dialogClassName,
      contentClassName,
      children,
      dialogAs: Dialog,
      "aria-labelledby": ariaLabelledby,

      show,
      animation,
      backdrop,
      keyboard,
      onEscapeKeyDown,
      onShow,
      onHide,
      container,
      autoFocus,
      enforceFocus,
      restoreFocus,
      restoreFocusOptions,
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExiting,
      onExited,
      backdropClassName,
      manager: propsManager,
      ...props
    },
    ref,
  ) => {
    const [modalStyle, setStyle] = useState({});
    const [animateStaticModal, setAnimateStaticModal] = useState(false);
    const waitingForMouseUpRef = useRef(false);
    const ignoreBackdropClickRef = useRef(false);
    const removeStaticModalAnimationRef = useRef<(() => void) | null>(null);
    const [modal, setModalRef] = useCallbackRef<ModalInstance>();
    const mergedRef = useMergedRefs(ref, setModalRef);
    const handleHide = useEventCallback(onHide);
    const isRTL = useIsRTL();
    bsPrefix = useBootstrapPrefix(bsPrefix, "modal");

    const modalContext = useMemo(
      () => ({
        onHide: handleHide,
      }),
      [handleHide],
    );

    function getModalManager() {
      if (propsManager) return propsManager;
      return getSharedManager({ isRTL });
    }
    function updateDialogStyle(node: any) {
      if (!canUseDOM) return;
      const containerIsOverflowing = getModalManager().getScrollbarWidth() > 0;
      const modalIsOverflowing =
        node.scrollHeight > ownerDocument(node).documentElement.clientHeight;

      setStyle({
        paddingRight:
          containerIsOverflowing && !modalIsOverflowing ? getScrollbarSize() : undefined,
        paddingLeft: !containerIsOverflowing && modalIsOverflowing ? getScrollbarSize() : undefined,
      });
    }

    const handleWindowResize = useEventCallback(() => {
      if (modal) {
        updateDialogStyle(modal.dialog);
      }
    });

    useWillUnmount(() => {
      removeEventListener(window as any, "resize", handleWindowResize);
      removeStaticModalAnimationRef.current?.();
    });

    const handleDialogMouseDown = () => {
      waitingForMouseUpRef.current = true;
    };

    const handleMouseUp = (e: any) => {
      if (waitingForMouseUpRef.current && modal && e.target === modal.dialog) {
        ignoreBackdropClickRef.current = true;
      }
      waitingForMouseUpRef.current = false;
    };
    const handleStaticModalAnimation = () => {
      setAnimateStaticModal(true);
      removeStaticModalAnimationRef.current = transitionEnd(modal!.dialog as any, () => {
        setAnimateStaticModal(false);
      });
    };
    const handleStaticBackdropClick = (e: any) => {
      if (e.target !== e.currentTarget) {
        return;
      }
      handleStaticModalAnimation();
    };

    const handleClick = (e: any) => {
      if (backdrop === "static") {
        handleStaticBackdropClick(e);
        return;
      }

      if (ignoreBackdropClickRef.current || e.target !== e.currentTarget) {
        ignoreBackdropClickRef.current = false;
        return;
      }

      onHide?.();
    };

    const handleEscapeKeyDown = (e: any) => {
      if (!keyboard && backdrop === "static") {
        e.preventDefault();
        handleStaticModalAnimation();
      } else if (keyboard && onEscapeKeyDown) {
        onEscapeKeyDown(e);
      }
    };

    const handleEnter = (node: any, isAppearing: any) => {
      if (node) {
        node.style.display = "block";
        updateDialogStyle(node);
      }
      onEnter?.(node, isAppearing);
    };

    const handleExit = (node: any) => {
      removeStaticModalAnimationRef.current?.();
      onExit?.node;
    };

    const handleEntering = (node: any, isAppearing: any) => {
      onEntering?.(node, isAppearing);
      addEventListener(window as any, "resize", handleWindowResize);
    };

    const handleExited = (node: any) => {
      if (node) node.style.display = "";
      onExited?.(node);
      removeEventListener(window as any, "resize", handleWindowResize);
    };

    const renderBackdrop = useCallback(
      backdropProps => (
        <div
          {...backdropProps}
          className={classNames(`${bsPrefix}-backdrop`, backdropClassName, !animation && "show")}
        />
      ),
      [animation, backdropClassName, bsPrefix],
    );

    const baseModalStyle = { ...style, ...modalStyle };
    if (!animation) {
      baseModalStyle.display = "block";
    }
    const renderDialog = (dialogProps: any) => (
      <div
        role="dialog"
        {...dialogProps}
        style={baseModalStyle}
        className={classNames(className, bsPrefix, animateStaticModal && `${bsPrefix}-static`)}
        onClick={backdrop ? handleClick : undefined}
        onMouseUp={handleMouseUp}
        aria-labelledby={ariaLabelledby}
      >
        {/*
      // @ts-ignore */}
        <Dialog
          {...props}
          onMouseDown={handleDialogMouseDown}
          className={dialogClassName}
          contentClassName={contentClassName}
        >
          {children}
        </Dialog>
      </div>
    );

    return (
      <ModalContext.Provider value={modalContext}>
        <BaseModal
          show={show}
          ref={mergedRef}
          backdrop={backdrop}
          container={container}
          keyboard
          autoFocus={autoFocus}
          enforceFocus={enforceFocus}
          restoreFocus={restoreFocus}
          restoreFocusOptions={restoreFocusOptions}
          onEscapeKeyDown={handleEscapeKeyDown}
          onShow={onShow}
          onHide={onHide}
          onEnter={handleEnter}
          onEntering={handleEntering}
          onEntered={onEntered}
          onExit={handleExit}
          onExiting={onExiting}
          onExited={handleExited}
          manager={getModalManager()}
          transition={animation ? DialogTransition : undefined}
          backdropTransition={animation ? BackdropTransition : undefined}
          renderBackdrop={renderBackdrop}
          renderDialog={renderDialog}
        />
      </ModalContext.Provider>
    );
  },
);

Modal.displayName = "Modal";
Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Object.assign(Modal, {
  Body: ModalBody,
  Header: ModalHeader,
  Title: ModalTitle,
  Footer: ModalFooter,
  Dialog: ModalDialog,
  TRANSITION_DURATION: 300,
  BACKDROP_TRANSITION_DURATION: 150,
});
