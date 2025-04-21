import React from "react";
import RegisterForm from "../RegisterForm/registerform";
import "./studentRegister.css";

const StudentRegister = () => {
  return (
    <div className="register-wrapper">
      <div className="parallax-bg">
        <div className="overlay">
          <h1 className="register-heading">Welcome Future Scholar!</h1>
          <p className="register-subtext">Join the learning journey by registering below</p>
          <div className="form-container">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
