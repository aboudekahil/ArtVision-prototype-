import React, { HTMLProps, MouseEventHandler, useRef } from "react";
import { HOST } from "../../utils/configs.ts";
import { DrawEvent, DrawEventTypes } from "./Canvas.tsx";
import { draw } from "../../utils/drawingFunctions.ts";
import { useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Requests from "../../http-common.ts";

type StreamerCanvasProps = {} & HTMLProps<HTMLCanvasElement>;
const StreamerCanvas: React.FC<StreamerCanvasProps> = ({
  width = 800,
  height = 800,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { roomId } = useParams();
  if (!roomId) return;

  let streamUrl = new URL(`ws://${HOST}/streaming/room/${roomId}`);

  streamUrl.searchParams.set(
    "user",
    (Requests.defaults.headers.common["Authorization"] as string | undefined) ||
      "",
  );

  const { sendJsonMessage, readyState } = useWebSocket(streamUrl.href);

  const handleMouseEvent: MouseEventHandler<HTMLCanvasElement> = (event) => {
    const drawEvent: DrawEvent = {
      type: event.type as DrawEventTypes,
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    };

    if (readyState === ReadyState.OPEN) {
      draw(canvasRef, drawEvent.x, drawEvent.y);
      sendJsonMessage(drawEvent);
    }
  };

  return (
    <canvas
      width={width}
      height={height}
      ref={canvasRef}
      onMouseDown={handleMouseEvent}
      onMouseMove={handleMouseEvent}
      {...props}
    ></canvas>
  );
};

export default StreamerCanvas;
