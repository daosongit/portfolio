import React, { useEffect, useState } from 'react';
import cl from './Game.module.scss';

export default function Game() {
  const BOARD_SIZE = 10;
  const DEFAULT_CELLS_VALUE = Array(BOARD_SIZE)
    .fill(Array(BOARD_SIZE))
    .fill(Array(BOARD_SIZE).fill(0));
  const SPEED = 1000;
  const MOVE_DIRECTION = {
    up: 'ArrowUp',
    down: 'ArrowDown',
    right: 'ArrowRight',
    left: 'ArrowLeft',
  };
  const getRandom = () => {
    return Math.floor(Math.random() * 10);
  };

  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState([getRandom(), getRandom()]);
  const [moveDirection, setMoveDirection] = useState(MOVE_DIRECTION.right);
  const [isDirectionIsChanged, setIsDirectionIsChanged] = useState(false);
  const [isStopped, setIsStopped] = useState(true);

  const checkAvailableSlot = (position) => {
    switch (true) {
      case position >= BOARD_SIZE:
        return 0;
      case position < 0:
        return BOARD_SIZE - 1;
      default:
        return position;
    }
  };

  useEffect(() => {
    if (isStopped) return;
    const keyDownHandler = (direction, e) => {
      if (direction === e.key) {
        document.addEventListener('keydown', keyDownHandler.bind(null, moveDirection), {
          once: true,
        });
        return;
      }
      if (Object.keys(MOVE_DIRECTION).find((key) => MOVE_DIRECTION[key] === e.key)) {
        setIsDirectionIsChanged(true);
        setMoveDirection(e.key);
      }
    };

    document.addEventListener('keydown', keyDownHandler.bind(null, moveDirection), { once: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveDirection, isStopped]);

  useEffect(() => {
    if (isStopped) return;
    let timerId;
    if (isDirectionIsChanged) timerId = gameLoop(0);
    else timerId = gameLoop(SPEED);
    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snake, moveDirection, isStopped]);

  const gameLoop = (speed) => {
    if (!snake.length) {
      setSnake([[getRandom(), getRandom()]]);
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
        setFood([getRandom(), getRandom()]);
        sliceIndex = 0;
      }
      setSnake(newSnake.slice(sliceIndex));
    }, speed);
    setIsDirectionIsChanged(false);
    return timerId;
  };

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
