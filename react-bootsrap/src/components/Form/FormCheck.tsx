import classNames from "classnames";
import PropTypes from "prop-types";
import * as React from "react";

import { useContext, useMemo } from "react";
import Feedback, { FeedbackType } from "../Feedback";
import FormCheckInput from "./FormCheckInput";
import FormCheckLabel from "./FormCheckLabel";
import FormContext from "./FormContext";

import { useBootstrapPrefix } from "../ThemeProvider";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "../helpers";

export type FormCheckType = "checkbox" | "radio" | "switch";

export interface FormCheckProps extends BsPrefixProps, React.InputHTMLAttributes<HTMLInputElement> {
  inline?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  type?: FormCheckType;
  isValid?: boolean;
  isInvalid?: boolean;
  feedbackTooltip?: boolean;
  feedback?: React.ReactNode;
  feedbackType?: FeedbackType;
  bsSwitchPrefix?: string;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  bsSwitchPrefix: PropTypes.string,
  _ref: PropTypes.any,
  as: PropTypes.elementType,
  id: PropTypes.string,
  children: PropTypes.node,
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  label: PropTypes.node,
  type: PropTypes.oneOf(["radio", "checkbox", "switch"]),
  isValid: PropTypes.bool,
  isInvalid: PropTypes.bool,
  feedbackTooltip: PropTypes.bool,
  feedback: PropTypes.node,
};

const FormCheck: BsPrefixRefForwardingComponent<"input", FormCheckProps> = React.forwardRef<
  HTMLInputElement,
  FormCheckProps
>(
  (
    {
      id,
      bsPrefix,
      bsSwitchPrefix,
      inline = false,
      disabled = false,
      isValid = false,
      isInvalid = false,
      feedbackTooltip = false,
      feedback,
      feedbackType,
      className,
      style,
      title = "",
      type = "checkbox",
      label,
      children,
      as = "input",
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, "form-check");
    bsSwitchPrefix = useBootstrapPrefix(bsSwitchPrefix, "form-switch");
    const { controlId } = useContext(FormContext);
    const innerFormContext = useMemo(
      () => ({
        controlId: id || controlId,
      }),
      [controlId, id],
    );
    const hasLabel = label != null && label !== false && !children;

    const input = (
      <FormCheckInput
        {...props}
        type={type === "switch" ? "checkbox" : type}
        ref={ref}
        isValid={isValid}
        isInvalid={isInvalid}
        disabled={disabled}
        as={as}
      />
    );

    return (
      <FormContext.Provider value={innerFormContext}>
        <div
          style={style}
          className={classNames(
            className,
            label && bsPrefix,
            inline && `${bsPrefix}-inline`,
            type === "switch" && bsSwitchPrefix,
          )}
        >
          {children || (
            <>
              {input}
              {hasLabel && <FormCheckLabel title={title}>{label}</FormCheckLabel>}
              {feedback && (
                <Feedback type={feedbackType} tooltip={feedbackTooltip}>
                  {feedback}
                </Feedback>
              )}
            </>
          )}
        </div>
      </FormContext.Provider>
    );
  },
);
FormCheck.displayName = "FormCheck";
FormCheck.propTypes = propTypes;

export default Object.assign(FormCheck, {
  Input: FormCheckInput,
  Label: FormCheckLabel,
});
