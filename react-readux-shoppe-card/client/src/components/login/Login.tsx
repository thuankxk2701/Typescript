import React from "react";
import LoginHeader from "./LoginHeader";
import LoginMain from "./LoginMain";
import LoginFooter from "./LoginFooter";
import "./login.scss";

interface loginStateProps {
  types: string;
}
const Login: React.FC<loginStateProps> = ({ types }) => {
  return (
    <div className="login__container">
      <LoginHeader types={types} />
      <LoginMain types={types} />
      <LoginFooter />
    </div>
  );
};

export default Login;
