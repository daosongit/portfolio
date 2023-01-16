import React, { useEffect, useState } from 'react';
import Grid from './components/Grid/Grid';
import MainMenu from './components/MainMenu/MainMenu';
import { CHALENGES, MOVE_DIRECTION, SPEED } from './constants';
import { useChalenges, useGameLoop, useKeyDownEvent } from './hooks';
import { checkAvailableSlot, getRandomArr } from './modules';
import Navigation from './components/Navigation/Navigation';
import cl from './Game.module.scss';

export default function Game() {
  const [snake, setSnake] = useState([getRandomArr()]);
  const [food, setFood] = useState(getRandomArr());
  const [moveDirection, setMoveDirection] = useState(MOVE_DIRECTION.right);
  const [isDirectionIsChanged, setIsDirectionIsChanged] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [gameOver, setGameOver] = useState({ isLoosed: false, coordinates: [], isShown: false });
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [speed, setSpeed] = useState(SPEED[2]);
  const [chalenges, setChalenges] = useState(CHALENGES.Default.name);
  const [chalengesState, setChalengesState] = useState(undefined);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setScore(snake.length - 1);
  }, [snake]);

  const gameLoop = (timeout) => {
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
        //show main menu with delay
        setTimeout(() => {
          setIsGameStarted(false);
        }, 1000);

        const storedScore = localStorage.getItem('score');
        if (!storedScore || Number(storedScore) < score) {
          localStorage.setItem('score', score.toString());
        }
        return 0;
      }

      let sliceIndex = 1;
      if (head[0] === food[0] && head[1] === food[1]) {
        setFood(getRandomArr());
        if (chalengesState) {
          clearTimeout(chalengesState);
          setChalengesState(undefined);
        }
        sliceIndex = 0;
      }
      setSnake(newSnake.slice(sliceIndex));
    }, timeout);
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
    speed,
  );

  useChalenges(
    isStopped,
    gameOver.isLoosed,
    isGameStarted,
    chalenges,
    speed,
    chalengesState,
    setFood,
    setChalengesState,
  );

  return (
    <div className={cl.wrapper}>
      <Navigation
        isGameStarted={isGameStarted}
        isStopped={isStopped}
        score={score}
        setIsGameStarted={setIsGameStarted}
        setIsStopped={setIsStopped}
      />
      <div className={cl.gameField}>
        {isGameStarted ? (
          <Grid
            snake={snake}
            food={food}
            isLoosed={gameOver.isLoosed}
            rabbitIsHiding={chalenges === CHALENGES.Rabbit_Is_Hiding.name}
            chalengesState={chalengesState}
          />
        ) : (
          <MainMenu
            speed={speed}
            isLoosed={gameOver.isLoosed}
            setGameOver={setGameOver}
            setIsGameStarted={setIsGameStarted}
            setSnake={setSnake}
            setSpeed={setSpeed}
            chalenges={chalenges}
            setChalenges={setChalenges}
            setChalengesState={setChalengesState}
            setIsStopped={setIsStopped}
          />
        )}
      </div>
    </div>
  );
}
