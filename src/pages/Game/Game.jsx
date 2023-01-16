import React, { useState } from 'react';
import Grid from './components/Grid/Grid';
import MainMenu from './components/MainMenu/MainMenu';
import { MOVE_DIRECTION, SPEED } from './constants';
import { useGameLoop, useKeyDownEvent } from './hooks';
import { checkAvailableSlot, getRandomArr } from './modules';
import { HiOutlinePlay as IcoPlay, HiOutlinePause as IcoPause } from 'react-icons/hi';
import cl from './Game.module.scss';

export default function Game() {
  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState([]);
  const [moveDirection, setMoveDirection] = useState(MOVE_DIRECTION.right);
  const [isDirectionIsChanged, setIsDirectionIsChanged] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [gameOver, setGameOver] = useState({ isLoosed: false, coordinates: [], isShown: false });
  const [isGameStarted, setIsGameStarted] = useState(false);

  const gameLoop = (speed) => {
    if (!food.length) {
      setFood(getRandomArr());
    }
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
        setTimeout(() => {
          setIsGameStarted(false);
        }, 1000);
        return 0;
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
    isGameStarted,
    gameOver.isLoosed,
    isStopped,
    moveDirection,
    setMoveDirection,
    setIsDirectionIsChanged,
    MOVE_DIRECTION,
  );

  useGameLoop(
    isGameStarted,
    gameOver.isLoosed,
    isStopped,
    isDirectionIsChanged,
    snake,
    moveDirection,
    gameLoop,
    SPEED,
  );

  return (
    <div className={cl.wrapper}>
      {isGameStarted ? (
        <div className={cl.startStop}>
          <button onClick={() => setIsStopped(!isStopped)}>
            {isStopped ? <IcoPlay /> : <IcoPause />}
          </button>
        </div>
      ) : (
        <></>
      )}

      <div className={cl.gameField}>
        {isGameStarted ? (
          <Grid snake={snake} food={food} isLoosed={gameOver.isLoosed} />
        ) : (
          <MainMenu
            isLoosed={gameOver.isLoosed}
            setGameOver={setGameOver}
            setIsGameStarted={setIsGameStarted}
            setSnake={setSnake}
          />
        )}
      </div>
    </div>
  );
}
