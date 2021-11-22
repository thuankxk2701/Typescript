import * as React from "react";

interface FormContextTypes {
  controlId?: any;
}

const FormContext = React.createContext<FormContextTypes>({});

export default FormContext;
