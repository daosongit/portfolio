export const BOARD_SIZE = 10;

export const DEFAULT_CELLS_VALUE = Array(BOARD_SIZE)
  .fill(Array(BOARD_SIZE))
  .fill(Array(BOARD_SIZE).fill(0));

export const SPEED = [700, 500, 300, 200, 100];

export const MOVE_DIRECTION = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  right: 'ArrowRight',
  left: 'ArrowLeft',
};

export const CHALENGES = {
  Default: { name: 'default', label: 'Standart' },
  Rabbit_Is_Hiding: { name: 'hide', label: 'Where is my food?', hided: false },
  Rabbit_Is_Moving: { name: 'move', label: 'Move is life', timerId: undefined },
};
// export const CHALENGES = [{ Default: ''}, {Rabbit_Is_Hiding: 'Hide'}, {Rabbit_Is_Moving: 'Move'} ];
