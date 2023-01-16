import { useEffect } from 'react';
import { CHALENGES } from './constants';
import { getRandomArr } from './modules';

export const useKeyDownEvent = (
  isGameStarted,
  isLoosed,
  isStopped,
  moveDirection,
  setDirection,
  setIsDirectionChanged,
  MOVE_DIRECTION,
) => {
  useEffect(() => {
    if (!isGameStarted) return;
    if (isStopped || isLoosed) return;
    const keyDownHandler = (direction, e) => {
      if (direction === e.key) {
        document.addEventListener('keydown', keyDownHandler.bind(null, moveDirection), {
          once: true,
        });
      } else if (Object.keys(MOVE_DIRECTION).find((key) => MOVE_DIRECTION[key] === e.key)) {
        setIsDirectionChanged(true);
        setDirection(e.key);
      } else {
        document.addEventListener('keydown', keyDownHandler.bind(null, moveDirection), {
          once: true,
        });
      }
    };

    document.addEventListener('keydown', keyDownHandler.bind(null, moveDirection), { once: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveDirection, isStopped, isLoosed, isGameStarted]);
};

export const useGameLoop = (
  isGameStarted,
  isLoosed,
  isStopped,
  isDirectionChanged,
  snake,
  moveDirection,
  gameLoop,
  speed,
) => {
  useEffect(() => {
    if (!isGameStarted) return;
    if (isStopped || isLoosed) return;
    let timerId;
    if (isDirectionChanged) timerId = gameLoop(0);
    else timerId = gameLoop(speed);
    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snake, moveDirection, isStopped, isLoosed, isGameStarted]);
};

export const useChalenges = (
  isStopped,
  isLoosed,
  isGameStarted,
  chalenges,
  speed,
  chalengesState,
  setFood,
  setChalengesState,
) => {
  useEffect(() => {
    if (isStopped || isLoosed || !isGameStarted) return;
    switch (chalenges) {
      case CHALENGES.Rabbit_Is_Moving.name:
        if (!chalengesState) {
          const id = setTimeout(() => {
            setFood(getRandomArr());
            setChalengesState(undefined);
          }, speed * 7);
          setChalengesState(id);
        }
        break;
      case CHALENGES.Rabbit_Is_Hiding.name:
        if (!chalengesState) {
          const hideId = setTimeout(() => {
            setChalengesState(hideId);
          }, speed * 4);
        }
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chalengesState, isStopped, isLoosed, isGameStarted]);
};
