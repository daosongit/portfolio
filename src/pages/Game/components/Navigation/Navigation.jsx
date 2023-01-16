import React from 'react';
import {
  HiOutlinePlay as IcoPlay,
  HiOutlinePause as IcoPause,
  HiOutlineArrowLeft as IcoBack,
} from 'react-icons/hi';
import cl from './Navigation.module.scss';

export default function Navigation({
  isGameStarted,
  isStopped,
  score,
  setIsGameStarted,
  setIsStopped,
}) {
  if (isGameStarted) {
    return (
      <div className={cl.navigation}>
        <span>{score}</span>
        <div>
          <button title="Go to main menu" onClick={() => setIsGameStarted(false)}>
            <IcoBack />
          </button>
          <button title="Start/Stop" onClick={() => setIsStopped(!isStopped)}>
            {isStopped ? <IcoPlay /> : <IcoPause />}
          </button>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
