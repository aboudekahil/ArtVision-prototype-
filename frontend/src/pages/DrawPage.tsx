import Canvas from "../components/Canvas";
import DraggableWindow from "../components/DraggableWindow";

const DrawPage: React.FC = () => {
  return (
    <>
      <DraggableWindow
        initialPosition={{ x: 100, y: 50 }}
        style={{ fontSize: 0 }}
      >
        <Canvas
          style={{
            backgroundColor: "#fafafa",
          }}
          width={400}
          height={400}
        />
      </DraggableWindow>

      <DraggableWindow locked={false}>
        <input type="color" />
      </DraggableWindow>
    </>
  );
};

export default DrawPage;
