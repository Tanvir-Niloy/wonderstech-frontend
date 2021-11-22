import React from "react";
import { RotateSpinner } from "react-spinners-kit";

const Loader = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <RotateSpinner size={30} />
    </div>
  );
};

export default Loader;
