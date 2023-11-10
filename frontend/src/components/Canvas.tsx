import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface CanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {
  width?: number;
  height?: number;
}

const Canvas: React.FC<CanvasProps> = ({ ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    setCtx(canvas.getContext("2d")!);
  }, []);

  const handleDrag: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (e) => {
      if (!ctx || !e.buttons) return;

      const x = e.nativeEvent.offsetX,
        y = e.nativeEvent.offsetY;

      ctx.beginPath();
      ctx.fillStyle = "#FF0000";
      ctx.arc(x, y, 20, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
    },
    [ctx],
  );

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleDrag}
      onMouseMove={handleDrag}
      {...props}
    ></canvas>
  );
};

export default Canvas;
