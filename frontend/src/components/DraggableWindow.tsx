import React, {
  CSSProperties,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/web";
import cm from "../utils/cm.ts";

interface DraggableWindowProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  initialPosition?: { x: number; y: number };
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({
  children,
  style,
  initialPosition = { x: 0, y: 0 },
  className,
  ...props
}) => {
  const [locked, setLocked] = useState(true);
  const divRef = useRef<HTMLDivElement>(null);
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const _style: CSSProperties = {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bindProps = locked ? {} : bind();

  return (
    <>
      <animated.div
        ref={divRef}
        {...bindProps}
        className={cm("inline-block touch-none", className, {
          "shadow-lg shadow-orange-700": locked,
        })}
        style={{ ..._style, x, y }}
        {...props}
        onContextMenu={(e) => {
          e.preventDefault();
          setLocked(!locked);
        }}
      >
        <span
          className={cm({
            "pointer-events-none": !locked,
          })}
        >
          {children}
        </span>
      </animated.div>
    </>
  );
};

export default DraggableWindow;
