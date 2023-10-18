import React, { CSSProperties, HTMLAttributes, useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/web";

interface DraggableWindowProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({
  children,
  style,
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [{ x, y }, api] = useSpring(() => ({
    x: 5,
    y: 5,
  }));

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

  return (
    <animated.div
      ref={divRef}
      {...bind()}
      style={{ ..._style, x, y }}
      {...props}
    >
      {children}
    </animated.div>
  );
};

export default DraggableWindow;
