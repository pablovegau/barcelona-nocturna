// @ts-nocheck
import { useRef } from "react";

export function useCardShift() {
  const boundingRef = useRef(null);

  function handleOnMouseEnter(event) {
    boundingRef.current = event.target.getBoundingClientRect();
  }

  function handleOnMouseLeave(event) {
    boundingRef.current = null;
  }

  function handleOnMouseMove(event) {
    if (!boundingRef.current) return;

    const x = event.clientX - boundingRef.current.left;
    const y = event.clientY - boundingRef.current.top;
    const xPercentage = x / boundingRef.current.width;
    const yPercentage = y / boundingRef.current.height;
    const xRotation = (xPercentage - 0.5) * 20;
    const yRotation = (0.5 - yPercentage) * 20;

    event.currentTarget.style.setProperty("--x-rotation", `${yRotation}deg`);
    event.currentTarget.style.setProperty("--y-rotation", `${xRotation}deg`);
    event.currentTarget.style.setProperty("--x", `${xPercentage * 100}%`);
    event.currentTarget.style.setProperty("--y", `${yPercentage * 100}%`);
  }

  return {
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOnMouseMove,
  };
}
