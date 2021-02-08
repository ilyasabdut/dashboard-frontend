import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser)

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {currentUser.data.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.data.email}
      </p>
    </div>
  );
};

export default Profile;
