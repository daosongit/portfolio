export const BOARD_SIZE = 10;

export const DEFAULT_CELLS_VALUE = Array(BOARD_SIZE)
  .fill(Array(BOARD_SIZE))
  .fill(Array(BOARD_SIZE).fill(0));

export const SPEED = 250;

export const MOVE_DIRECTION = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  right: 'ArrowRight',
  left: 'ArrowLeft',
};
