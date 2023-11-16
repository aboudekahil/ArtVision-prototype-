import Canvas from "../components/CanvasComponents/Canvas.tsx";
import DraggableWindow from "../components/DraggableWindow";
import React, { useEffect } from "react";
import ColorArea from "../components/ColorArea.tsx";
import Header from "../components/HeaderComponents/Header.tsx";
import { useNavigate } from "react-router-dom";

const DrawPage: React.FC = () => {
  return (
    <>
      <Header />
      <DraggableWindow
        initialPosition={{ x: 100, y: 50 }}
        style={{ fontSize: 0 }}
        className="rounded"
      >
        <Canvas
          className="bg-[#FAFAFA] rounded"
          mode={"drawer"}
          width={400}
          height={400}
        />
      </DraggableWindow>

      <DraggableWindow className="rounded">
        <ColorArea isDisabled={false} />
      </DraggableWindow>
    </>
  );
};

export default DrawPage;
