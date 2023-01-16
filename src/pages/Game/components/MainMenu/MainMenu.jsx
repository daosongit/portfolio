import React, { useRef } from 'react';
import { CHALENGES, SPEED } from '../../constants';
import { getRandomArr } from '../../modules';
import cl from './MainMenu.module.scss';

export default function MainMenu({
  speed,
  isLoosed,
  setGameOver,
  setIsGameStarted,
  setSnake,
  setSpeed,
  chalenges,
  setChalenges,
  setChalengesState,
  setIsStopped,
}) {
  const refStore = useRef(localStorage.getItem('score'));

  const radioHandler = (e) => {
    setChalenges(e.target.defaultValue);
  };

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
        <h4>Best score: {refStore.current}</h4>
        <button
          onClick={() => {
            setIsGameStarted(true);
            setSnake([getRandomArr()]);
            setGameOver({ isLoosed: false, coordinates: [], isShown: false });
            setChalengesState(undefined);
            setIsStopped(false);
          }}>
          New Game
        </button>
        <div className={cl.settings}>
          <div className={cl.speed}>
            <h3>Speed:</h3>
            <div className={cl.btn}>
              {SPEED.map((itm, idx) => {
                const btnClass = speed === SPEED[idx] ? cl.crntSpeed : '';
                return (
                  <button
                    className={btnClass}
                    disabled={btnClass}
                    onClick={() => setSpeed(SPEED[idx])}
                    key={idx}>
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
          <div className={cl.chalenges}>
            <h3>Chalenges:</h3>
            <fieldset>
              {Object.keys(CHALENGES).map((key) => (
                <div key={CHALENGES[key].name}>
                  <input
                    type="radio"
                    id={CHALENGES[key].name}
                    name="chalenges"
                    value={CHALENGES[key].name}
                    onChange={radioHandler}
                    checked={chalenges === CHALENGES[key].name}
                  />
                  <label htmlFor={CHALENGES[key].name}>{CHALENGES[key].label}</label>
                </div>
              ))}
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}
