import React, { useState, useEffect, useRef } from 'react';
import SnakeEngine, {startGame} from '../lib/SnakeEngine';

export default () => {

    const gameCanvas = useRef()

    useEffect(() => {
        const canvas = gameCanvas.current
        if (canvas) {
            const ctx = canvas.getContext('2d')
            ctx.fillStyle = 'white'
            ctx.fillRect(0,0,canvas.width, canvas.height)
            const snake = new SnakeEngine(100, 100, 0, SnakeEngine.INITIAL_LENGTH, ctx)
            const game = {
                snake,
                foods: [],
            }
            startGame(game, ctx)
        }
    }, [])

    return (
        <>
            <div class="wrapper">
                <p id="score">Score: 0</p>
                <canvas ref={gameCanvas} id="map" width="600" height="600"></canvas>
            </div>
        </>
    )
}