import React, { useState } from 'react';
import { DEFAULT_CELLS_VALUE, MOVE_DIRECTION, SPEED } from './constants';
import cl from './Game.module.scss';
import { useGameLoop, useGameOverWindow, useKeyDownEvent } from './hooks';
import { checkAvailableSlot, getRandomArr } from './modules';

export default function Game() {
  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState(getRandomArr());
  const [moveDirection, setMoveDirection] = useState(MOVE_DIRECTION.right);
  const [isDirectionIsChanged, setIsDirectionIsChanged] = useState(false);
  const [isStopped, setIsStopped] = useState(true);
  const [gameOver, setGameOver] = useState({ isLoosed: false, coordinates: [], isShown: false });

  const gameLoop = (speed) => {
    if (!snake.length) {
      setSnake([getRandomArr()]);
      return;
    }
    const timerId = setTimeout(() => {
      const newSnake = snake;
      let move = [];
      switch (moveDirection) {
        case MOVE_DIRECTION.up:
          move = [-1, 0];
          break;
        case MOVE_DIRECTION.down:
          move = [1, 0];
          break;
        case MOVE_DIRECTION.right:
          move = [0, 1];
          break;
        case MOVE_DIRECTION.left:
          move = [0, -1];
          break;
        default:
          break;
      }
      const head = [
        checkAvailableSlot(newSnake[snake.length - 1][0] + move[0]),
        checkAvailableSlot(newSnake[snake.length - 1][1] + move[1]),
      ];

      newSnake.push(head);

      // find arrays with same first value
      const buff = [...newSnake.filter((a) => a[0] === newSnake.at(-1)[0])];
      // find dublicates
      const buff2 = buff.filter((a) => a[1] === newSnake.at(-1)[1]);
      // if snake has two same arrays then it is eaten yourself
      if (buff2.length > 1) {
        const loose = { isLoosed: true, coordinates: buff2[0], isShown: false };
        setGameOver(loose);
      }

      let sliceIndex = 1;
      if (head[0] === food[0] && head[1] === food[1]) {
        setFood(getRandomArr());
        sliceIndex = 0;
      }
      setSnake(newSnake.slice(sliceIndex));
    }, speed);
    setIsDirectionIsChanged(false);
    return timerId;
  };

  useKeyDownEvent(
    gameOver.isLoosed,
    isStopped,
    moveDirection,
    setMoveDirection,
    setIsDirectionIsChanged,
    MOVE_DIRECTION,
  );

  useGameLoop(
    gameOver.isLoosed,
    isStopped,
    isDirectionIsChanged,
    snake,
    moveDirection,
    gameLoop,
    SPEED,
  );

  useGameOverWindow(gameOver, setGameOver);

  const GameOver = () => {
    if (gameOver.isShown) {
      function newGame() {
        setSnake([]);
        setGameOver({ isLoosed: false, coordinates: [], isShown: false });
      }
      return (
        <div className={cl.gameOver}>
          <h1>GAME OVER</h1> <button onClick={newGame}>New Game</button>
        </div>
      );
    } else return <></>;
  };

  return (
    <div className={cl.wrapper}>
      <button onClick={() => setIsStopped(!isStopped)}>{isStopped ? 'START' : 'STOP'}</button>
      <div className={cl.gameField}>
        {DEFAULT_CELLS_VALUE.map((row, idxR) => (
          <div key={idxR} className={cl.row}>
            {row.map((cell, idxC) => {
              const coord = gameOver.coordinates;
              let failedCell = '';
              if (coord.length && coord[0] === idxR && coord[1] === idxC) {
                failedCell = cl.failedCell;
              }
              let type = snake.find((a) => a[0] === idxR && a[1] === idxC) && cl.snake;
              if (!type) type = food[0] === idxR && food[1] === idxC && cl.food;
              return <div key={idxC} className={[cl.cell, type, failedCell].join(' ')}></div>;
            })}
          </div>
        ))}
      </div>
      <GameOver />
    </div>
  );
}
