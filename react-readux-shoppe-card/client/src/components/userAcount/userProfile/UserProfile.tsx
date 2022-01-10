import React from "react";
import { typeStateUserProps } from "../../../redux/reducer";

import "./UserProfile.scss";
interface userProfileProrps {
  user: typeStateUserProps;
}

const UserProfile: React.FC<userProfileProrps> = ({ user }) => {
  console.log(user);

  return <div className="user__description--profile">dasdas</div>;
};

export default UserProfile;
