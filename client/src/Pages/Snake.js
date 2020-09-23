import React, { useEffect, useRef } from 'react';
import SnakeEngine, { startGame } from '../lib/SnakeEngine';
import { useHistory } from 'react-router-dom'

export default ({ location }) => {
    const history = useHistory()
    const gameCanvas = useRef()
    let toRoute = ''

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
            // toRoute = route
        }
    }, [])

    useEffect(() => {
        // history.push('/snake/leaderboard')
        console.log(toRoute, '<<<<<<<')
    }, [toRoute])
    
    return (
        <>
            <div className="wrapper">
                <p id="score" className="mt-5 mb-5">Score: 0</p>
                <canvas ref={gameCanvas} id="map" width="600" height="600"></canvas>
            </div>
        </>
    )
}