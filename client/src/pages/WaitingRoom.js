import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../lotties/32617-loading-gatudata.json';

export default () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };
    return(
        <div className="container justify-content-center">
            <div className="preload ">
                <Lottie 
                    options={defaultOptions}
                    height={500}
                    width={500}
                />
                <div className="col-12">
                <h1>Waiting for another player...</h1>
                </div>
            </div>
        </div>
    )
}