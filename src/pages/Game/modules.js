import { BOARD_SIZE } from './constants';

export const checkAvailableSlot = (position) => {
  switch (true) {
    case position >= BOARD_SIZE:
      return 0;
    case position < 0:
      return BOARD_SIZE - 1;
    default:
      return position;
  }
};

export const getRandomArr = () => {
  return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
};
