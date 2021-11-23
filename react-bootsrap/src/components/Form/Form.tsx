import classNames from "classnames";
import * as React from "react";
import PropTypes from "prop-types";
import FormCheck from "./FormCheck";
import FormControl from "./FormControl";
import FormFloating from "./FormFloating";
import FormGroup from "./FormGroup";
import FormLabel from "./FormLabel";
import FormRange from "./FormRange";
import FormSelect from "./FormRange";
import FormText from "./FormText";
import Switch from "./Switch";
import FloatingLabel from "./FloatingLabel";
import { BsPrefixRefForwardingComponent, AsProp } from "../helpers";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement>, AsProp {
  validated?: boolean;
}

const propTypes = {
  _ref: PropTypes.any,
  validated: PropTypes.bool,
  as: PropTypes.elementType,
};
const Form: BsPrefixRefForwardingComponent<"form", FormProps> = React.forwardRef<
  HTMLFormElement,
  FormProps
>(({ className, validated, as: Component = "form", ...props }, ref) => (
  <Component {...props} ref={ref} className={classNames(className, validated && "was-validated")} />
));

Form.displayName = "Form";
Form.propTypes = propTypes as any;

export default Object.assign(Form, {
  Group: FormGroup,
  Control: FormControl,
  Floating: FormFloating,
  Check: FormCheck,
  Switch,
  Label: FormLabel,
  Text: FormText,
  Range: FormRange,
  Select: FormSelect,
  FloatingLabel,
});
