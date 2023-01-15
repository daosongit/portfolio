import { useEffect } from 'react';

export const useKeyDownEvent = (
  isLoosed,
  isStopped,
  moveDirection,
  setDirection,
  setIsDirectionChanged,
  MOVE_DIRECTION,
) => {
  useEffect(() => {
    if (isStopped || isLoosed) return;
    const keyDownHandler = (direction, e) => {
      if (direction === e.key) {
        document.addEventListener('keydown', keyDownHandler.bind(null, moveDirection), {
          once: true,
        });
        return;
      }
      if (Object.keys(MOVE_DIRECTION).find((key) => MOVE_DIRECTION[key] === e.key)) {
        setIsDirectionChanged(true);
        setDirection(e.key);
      }
    };

    document.addEventListener('keydown', keyDownHandler.bind(null, moveDirection), { once: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveDirection, isStopped, isLoosed]);
};

export const useGameLoop = (
  isLoosed,
  isStopped,
  isDirectionChanged,
  snake,
  moveDirection,
  gameLoop,
  SPEED,
) => {
  useEffect(() => {
    if (isStopped || isLoosed) return;

    let timerId;
    if (isDirectionChanged) timerId = gameLoop(0);
    else timerId = gameLoop(SPEED);
    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snake, moveDirection, isStopped, isLoosed]);
};

export const useGameOverWindow = (gameOver, setGameOver) => {
  useEffect(() => {
    if (gameOver.isLoosed) {
      setTimeout(() => {
        const as = { ...gameOver };
        as.isShown = true;
        setGameOver(as);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver.isLoosed]);
};
