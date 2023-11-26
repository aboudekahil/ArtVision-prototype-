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
  const drawQueue = useRef<DrawEvent[]>([]);
  const isDrawing = useRef(false);

  const { roomId } = useParams();
  if (!roomId) return;

  const processQueue = () => {
    if (drawQueue.current.length > 0 && !isDrawing.current) {
      isDrawing.current = true;
      const drawEvent = drawQueue.current.shift() as DrawEvent;
      draw(canvasRef, drawEvent.x, drawEvent.y);
      setTimeout(() => {
        isDrawing.current = false;
        processQueue();
      }, 10);
    }
  };

  useEffect(() => {
    ws.current = new WebSocket(`ws://${HOST}/streaming/room/${roomId}`);

    ws.current.onmessage = (event) => {
      const drawEvent: DrawEvent = JSON.parse(event.data) as DrawEvent;
      drawQueue.current.push(drawEvent);
      processQueue();
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
