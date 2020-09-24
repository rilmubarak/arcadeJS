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
          <h1>Waiting for another player...</h1>
        </div>
        <div className="col-6">
          <div className="rules">
            <div className=" neumorphism">
              <h4>RULES</h4>
              - hit the mouse with your hammer.  <br/>
              - the target will appear randomly  <br/>
              - simply move and click the mouse over the target you want to hit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
