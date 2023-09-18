import React from "react";

const VerifyMsg = () => {
  const msgStyle = {
    textTransform: "none",
    letterSpacing: "1px",

    padding: "200px 0",
    textAlign: "center",
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3 style={msgStyle}>Please, check your email inbox to verify your email and continue your registration.</h3>
        </div>
      </div>
    </div>
  );
};

export default VerifyMsg;
