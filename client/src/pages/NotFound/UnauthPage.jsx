import React from "react";

const UnauthPage = () => {
  return (
    <div className="flex flex-1 justify-center">
      <div className="inline-grid *:[grid-area:1/1] m-2">
        <div className="status status-error animate-ping"></div>
        <div className="status status-error"></div>
      </div>{" "}
      You're not Authorized to access this page
    </div>
  );
};

export default UnauthPage;
