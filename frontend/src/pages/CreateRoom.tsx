import React from "react";
import { useNavigate } from "react-router-dom";

const CreateRoom: React.FC = () => {
  const navigate = useNavigate();

  const create: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    const resp = await fetch("http://localhost:8081/create");
    const { room_id } = (await resp.json()) as { room_id: string };

    navigate(`/room/${room_id}`, { state: { id: room_id } });
  };

  return (
    <div>
      <button onClick={create}>Create Room </button>
    </div>
  );
};

export default CreateRoom;
