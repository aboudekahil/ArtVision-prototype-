import React, { CSSProperties, HTMLAttributes, useEffect, useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/web";

interface DraggableWindowProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  locked?: boolean;
  initialPosition?: { x: number; y: number };
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({
  children,
  style,
  initialPosition = { x: 0, y: 0 },
  locked = false,
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const _style: CSSProperties = {
    display: "inline-block",
    touchAction: "none",
    border: "4px solid #4444dd",
    borderRadius: "5px",
    ...style,
  };

  const bind = useDrag(
    ({ offset: [ox, oy] }) => {
      api.start({ x: ox, y: oy });
    },
    {
      bounds: document.body,
    },
  );

  useEffect(() => {
    api.start(initialPosition);
  }, []);

  const bindProps = locked ? {} : bind();

  return (
    <animated.div
      ref={divRef}
      {...bindProps}
      style={{ ..._style, x, y }}
      {...props}
    >
      {children}
    </animated.div>
  );
};

export default DraggableWindow;
