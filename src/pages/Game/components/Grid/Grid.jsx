import React from 'react';
import { DEFAULT_CELLS_VALUE } from '../../constants';
import { GiRabbit as IcoFood, GiTritonHead as IcoHead } from 'react-icons/gi';
import cl from './Grid.module.scss';

export default function Grid({ snake, food, isLoosed, rabbitIsHiding, chalengesState }) {
  return DEFAULT_CELLS_VALUE.map((row, idxR) => (
    <div key={idxR} className={cl.row}>
      {row.map((cell, idxC) => {
        let failedClass = '';
        let Icon = () => <></>;
        let type = '';
        const isHead = snake.length && snake.at(-1)[0] === idxR && snake.at(-1)[1] === idxC;
        const isFood = food[0] === idxR && food[1] === idxC;
        const isSnake = snake.find((a) => a[0] === idxR && a[1] === idxC);
        if (isHead) {
          if (isLoosed) failedClass = cl.failedCell;
          Icon = () => <IcoHead />;
          type = cl.head;
        } else if (isSnake) {
          type = cl.snake;
        }
        if (isFood) {
          if (!rabbitIsHiding) Icon = () => <IcoFood color={'rgb(81, 79, 79)'} />;
          else if (!chalengesState) Icon = () => <IcoFood color={'rgb(81, 79, 79)'} />;
        }

        return (
          <div key={idxC} className={[cl.cell, failedClass, type].join(' ')}>
            <Icon />
          </div>
        );
      })}
    </div>
  ));
}
