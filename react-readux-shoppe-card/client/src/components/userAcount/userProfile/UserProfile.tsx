import React from "react";
import Navbar from "../../home/NavbarHome/Navbar";
import LoginFooter from "../../login/LoginFooter";
import "./UserProfile.scss";

const UserProfile: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="user__profile">profile</div>
      <LoginFooter />
    </>
  );
};

export default UserProfile;
