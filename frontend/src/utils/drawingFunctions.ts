import { RefObject } from "react";

export const draw = (
  canvasRef: RefObject<HTMLCanvasElement>,
  x: number,
  y: number,
) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.beginPath();
  ctx.fillStyle = "#FF0000";
  ctx.arc(x, y, 20, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.closePath();
};
