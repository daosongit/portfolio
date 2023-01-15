import React, { useState } from 'react';
import { DEFAULT_CELLS_VALUE, MOVE_DIRECTION, SPEED } from './constants';
import cl from './Game.module.scss';
import { useGameLoop, useKeyDownEvent } from './hooks';
import { checkAvailableSlot, getRandomArr } from './modules';

export default function Game() {
  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState(getRandomArr());
  const [moveDirection, setMoveDirection] = useState(MOVE_DIRECTION.right);
  const [isDirectionIsChanged, setIsDirectionIsChanged] = useState(false);
  const [isStopped, setIsStopped] = useState(true);

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
    isStopped,
    moveDirection,
    setMoveDirection,
    setIsDirectionIsChanged,
    MOVE_DIRECTION,
  );

  useGameLoop(isStopped, isDirectionIsChanged, snake, moveDirection, gameLoop, SPEED);

  return (
    <div className={cl.wrapper}>
      <button onClick={() => setIsStopped(!isStopped)}>{isStopped ? 'START' : 'STOP'}</button>
      {DEFAULT_CELLS_VALUE.map((row, idxR) => (
        <div key={idxR} className={cl.row}>
          {row.map((cell, idxC) => {
            let type = snake.find((a) => a[0] === idxR && a[1] === idxC) && 'snake';
            if (!type) type = food[0] === idxR && food[1] === idxC && 'food';
            return <div key={idxC} className={[cl.cell, cl[type]].join(' ')}></div>;
          })}
        </div>
      ))}
    </div>
  );
}
