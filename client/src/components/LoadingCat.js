import React from "react";
import Lottie from "react-lottie";
import animationData from "../lotties/32617-loading-gatudata.json";

export default () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="container waiting">
      <div className="row">
        <div className="col-6">
          <div className="preload ">
            <Lottie options={defaultOptions} height={500} width={500} />
          </div>
          <h1>Loading</h1>
        </div>
      </div>
    </div>
  );
};
