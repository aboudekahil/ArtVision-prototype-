import React, { HTMLProps, useEffect, useRef } from "react";
import { DrawEvent } from "./Canvas.tsx";
import { draw } from "../../utils/drawingFunctions.ts";
import { HOST } from "../../utils/configs.ts";
import { useParams } from "react-router-dom";

type WatcherCanvasProps = {} & HTMLProps<HTMLCanvasElement>;
const WatcherCanvas: React.FC<WatcherCanvasProps> = ({
  width = 800,
  height = 800,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ws = useRef<WebSocket>();

  const { roomId } = useParams();
  if (!roomId) return;

  useEffect(() => {
    ws.current = new WebSocket(`ws://${HOST}/streaming/room/${roomId}`);

    ws.current.onmessage = (event) => {
      const drawEvent: DrawEvent = JSON.parse(event.data) as DrawEvent;
      draw(canvasRef, drawEvent.x, drawEvent.y);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  return (
    <canvas width={width} height={height} ref={canvasRef} {...props}></canvas>
  );
};

export default WatcherCanvas;
