import React, { HTMLProps } from "react";
import StreamerCanvas from "./StreamerCanvas.tsx";
import WatcherCanvas from "./WatcherCanvas.tsx";

type CanvasProps = {
  mode: "watcher" | "drawer";
} & HTMLProps<HTMLCanvasElement>;

export type DrawEventTypes = "mousemove" | "mousedown";

export type DrawEvent = {
  type: DrawEventTypes;
  x: number;
  y: number;
};

const Canvas: React.FC<CanvasProps> = ({ mode, ...props }) => {
  switch (mode) {
    case "drawer":
      return <StreamerCanvas {...props} />;
    case "watcher":
      return <WatcherCanvas {...props} />;
  }
};

export default Canvas;
