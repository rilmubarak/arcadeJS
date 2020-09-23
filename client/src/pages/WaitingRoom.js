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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
              iusto et. Omnis quam enim vitae, esse dolores hic reiciendis nobis
              eligendi commodi eaque sed maxime non dolorum incidunt laudantium
              facilis!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
