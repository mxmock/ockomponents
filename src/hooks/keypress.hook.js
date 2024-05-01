import { useEffect, useState } from "react";

export const useKeyPress = (key, onKeyDown, onKeyUp) => {
  const [isPressed, setPressed] = useState(false);

  const handleDown = (event) => {
    const { key: pressedKey } = event;
    if (key === pressedKey) {
      if (onKeyDown) onKeyDown(event);
      setPressed(true);
    }
  };

  const handleUp = (event) => {
    const { key: releasedKey } = event;
    if (key === releasedKey) {
      if (onKeyUp) onKeyUp(event);
      setPressed(false);
    }
  };

  const listen = () => {
    window.addEventListener("keyup", handleUp);
    window.addEventListener("keydown", handleDown);

    return () => {
      window.removeEventListener("keyup", handleUp);
      window.removeEventListener("keydown", handleDown);
    };
  };

  // eslint-disable-next-line
  useEffect(listen, [onKeyDown, onKeyUp]);

  return isPressed;
};
