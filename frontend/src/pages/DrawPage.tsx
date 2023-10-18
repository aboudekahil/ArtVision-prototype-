import Canvas from "../components/Canvas";
import DraggableWindow from "./DraggableWindow";

const DrawPage: React.FC = () => {
  function reset() {}
  return (
    <>
      <DraggableWindow style={{ fontSize: 0 }}>
        <Canvas
          style={{
            backgroundColor: "#fafafa",
          }}
          width={400}
          height={400}
        />
      </DraggableWindow>

      <DraggableWindow>
        <input type="color" />
      </DraggableWindow>
    </>
  );
};

export default DrawPage;
