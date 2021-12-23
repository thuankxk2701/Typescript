import React from "react";
import Logo from "../logo/Logo";
import { Link } from "react-router-dom";
interface loginHeaderProps {
  types: string;
}
const LoginHeader: React.FC<loginHeaderProps> = ({ types }) => {
  return (
    <div className="login__heading">
      <div className="login__heading--left">
        <Link to="/">
          <Logo className="login__heading--left-background" />
        </Link>
        <span className="login__heading--left-text">{types}</span>
      </div>
      <div className="login__heading--right">
        <a href="#1" className="login__heading--right-help link">
          Help?
        </a>
      </div>
    </div>
  );
};

export default LoginHeader;
