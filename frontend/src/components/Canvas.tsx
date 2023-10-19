import React, { useEffect, useRef } from "react";

interface CanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {
  width?: number;
  height?: number;
}

const Canvas: React.FC<CanvasProps> = ({ ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (
      canvasRef.current &&
      "width" in canvasRef.current &&
      "height" in canvasRef.current
    ) {
    }
  }, [canvasRef]);

  return <canvas ref={canvasRef} {...props}></canvas>;
};

export default Canvas;
