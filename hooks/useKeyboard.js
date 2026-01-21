import { useState, useEffect } from "react";

export const useKeyboard = () => {
  const [input, setInput] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case "KeyW": setInput((s) => ({ ...s, forward: true })); break;
        case "KeyS": setInput((s) => ({ ...s, backward: true })); break;
        case "KeyA": setInput((s) => ({ ...s, left: true })); break;
        case "KeyD": setInput((s) => ({ ...s, right: true })); break;
        case "ShiftLeft": setInput((s) => ({ ...s, shift: true })); break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.code) {
        case "KeyW": setInput((s) => ({ ...s, forward: false })); break;
        case "KeyS": setInput((s) => ({ ...s, backward: false })); break;
        case "KeyA": setInput((s) => ({ ...s, left: false })); break;
        case "KeyD": setInput((s) => ({ ...s, right: false })); break;
        case "ShiftLeft": setInput((s) => ({ ...s, shift: false })); break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return input;
};