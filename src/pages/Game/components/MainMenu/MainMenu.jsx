import React from 'react';
import cl from './MainMenu.module.scss';

export default function MainMenu({ isLoosed, setGameOver, setIsGameStarted, setSnake }) {
  const Title = () => {
    if (isLoosed) {
      return (
        <div>
          <h1>GameOver</h1>
          <h2>I'm hangry, but eat yourself it's strange...</h2>
        </div>
      );
    } else {
      return <h1>I'm hungry...</h1>;
    }
  };

  return (
    <div className={cl.wrapper}>
      <div className={cl.mainMenu}>
        <Title />
        <button
          onClick={() => {
            setIsGameStarted(true);
            setSnake([]);
            setGameOver({ isLoosed: false, coordinates: [], isShown: false });
          }}>
          New Game
        </button>
      </div>
    </div>
  );
}
