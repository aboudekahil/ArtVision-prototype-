import { useColorArea } from "@react-aria/color";
import { useColorAreaState } from "@react-stately/color";
import { useFocusRing } from "@react-aria/focus";
import React from "react";

const SIZE = 192;
const FOCUSED_THUMB_SIZE = 28;
const THUMB_SIZE = 20;
const BORDER_RADIUS = 4;

type ColorAreaProps = {
  isDisabled: boolean;
};

const ColorArea: React.FC<ColorAreaProps> = (props) => {
  let inputXRef = React.useRef(null);
  let inputYRef = React.useRef(null);
  let containerRef = React.useRef(null);

  let state = useColorAreaState(props);

  let { colorAreaProps, gradientProps, xInputProps, yInputProps, thumbProps } =
    useColorArea({ ...props, inputXRef, inputYRef, containerRef }, state);

  let { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div
      ref={containerRef}
      {...colorAreaProps}
      style={{
        ...colorAreaProps.style,
        width: SIZE,
        height: SIZE,
        borderRadius: BORDER_RADIUS,
      }}
    >
      <div
        {...gradientProps}
        style={{
          ...gradientProps.style,
          borderRadius: BORDER_RADIUS,
          height: SIZE,
          width: SIZE,
        }}
      />
      <div
        {...thumbProps}
        style={{
          ...thumbProps.style,
          background: state.getDisplayColor().toString("css"),
          border: `2px solid white`,
          borderRadius: "50%",
          boxShadow: "0 0 0 1px black, inset 0 0 0 1px black",
          boxSizing: "border-box",
          height: isFocusVisible ? FOCUSED_THUMB_SIZE + 4 : THUMB_SIZE,
          transform: "translate(-50%, -50%)",
          width: isFocusVisible ? FOCUSED_THUMB_SIZE + 4 : THUMB_SIZE,
        }}
      >
        <input ref={inputXRef} {...xInputProps} {...focusProps} />
        <input ref={inputYRef} {...yInputProps} {...focusProps} />
      </div>
    </div>
  );
};

export default ColorArea;
