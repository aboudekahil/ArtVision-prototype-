import Canvas from "../components/Canvas";
import DraggableWindow from "../components/DraggableWindow";
import React from "react";
import ColorArea from "../components/ColorArea.tsx";
import Header from "../components/Header.tsx";

const DrawPage: React.FC = () => {
  return (
    <>
      <Header />
      <DraggableWindow
        initialPosition={{ x: 100, y: 50 }}
        style={{ fontSize: 0 }}
        className="rounded"
      >
        <Canvas className="bg-[#FAFAFA] rounded" width={400} height={400} />
      </DraggableWindow>

      <DraggableWindow className="rounded">
        <ColorArea isDisabled={false} />
      </DraggableWindow>
    </>
  );
};

export default DrawPage;
