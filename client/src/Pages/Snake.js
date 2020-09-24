import { useQuery } from '@apollo/client';
import React, { useState, useEffect, useRef } from 'react';
import SnakeEngine, {startGame} from '../lib/SnakeEngine';

export default ({ location }) => {
    // const {loading, error, data} = useQuery()
    const gameCanvas = useRef()

    useEffect(() => {
        // diff => location.data.diff // isinya antara 'easy', 'med', 'hard
        let username = location.data.username
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
            startGame(game, ctx, username)
        }
    }, [])

    // if (loading) return (<>loading..</>)
    // if (error) return (<>Error</>)

    return (
        <>
            <div className="wrapper">
                <p></p>
                <p id="score">Score: 0</p>
                <img src="snake.jpg" style={{display:'none'}} id="snake-img"></img>
                <canvas ref={gameCanvas} id="map" width="600" height="600"></canvas>
            </div>
        </>
    )
}