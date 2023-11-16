import Canvas from "../components/CanvasComponents/Canvas.tsx";
import DraggableWindow from "../components/DraggableWindow";
import React from "react";
import ColorArea from "../components/ColorArea.tsx";
import Header from "../components/HeaderComponents/Header.tsx";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { isStreamer } from "../services/streamingService.ts";

const StreamingRoomPage: React.FC = () => {
  const { roomId } = useParams();
  if (!roomId) return;

  const { isPending, data } = useQuery({
    queryKey: ["isstreamer"],
    queryFn: () => {
      return isStreamer(roomId);
    },
  });

  if (isPending) return "Loading...";

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
          mode={data ? "drawer" : "watcher"}
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

export default StreamingRoomPage;
