import { updateSideBar } from '../../redux/reducers';

export const useMouseEnterHandler = (state, setState, key, timeoutId) => {
  timeoutId.current = setTimeout(() => {
    const idx = state.findIndex((a) => a.key === key);
    const newState = [...state];
    newState[idx].isHover = true;
    setState(newState);
    timeoutId.current = undefined;
  }, 600);
};

export const useMouseLeaveHandler = (state, setState, key, timeoutId) => {
  if (timeoutId.current) {
    clearTimeout(timeoutId.current);
    timeoutId.current = undefined;
    return;
  }
  const idx = state.findIndex((a) => a.key === key);
  const newState = [...state];
  newState[idx].isHover = false;
  setState(newState);
};

export const useMenuItemClicked = (state, setState, key, dispatch) => {
  const newState = [...state];
  newState.forEach((itm) => {
    if (itm.key === key) {
      itm.isActive = !itm.isActive;
      dispatch(updateSideBar({ key: itm.key, isShown: itm.isActive }));
    } else {
      itm.isActive = false;
    }
  });
  setState(newState);
};
