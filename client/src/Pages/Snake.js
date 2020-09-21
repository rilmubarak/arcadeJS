import React from 'react';

export default () => {
    return (
        <>
            <h1 style={{textAlign: "center"}}> The Foods..</h1>
            <div class="wrapper">
                <p id="score">Score: 0</p>
                <canvas id="map" width="500" height="500"></canvas>
            </div>
        </>
    )
}