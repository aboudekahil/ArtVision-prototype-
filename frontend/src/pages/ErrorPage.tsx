import { Link, useRouteError } from "react-router-dom";
import DraggableWindow from "../components/DraggableWindow";

const ErrorPage: React.FC = () => {
  const error = useRouteError() as {
    status?: number;
    statusText?: string;
    message?: string;
  };
  return (
    <div className="bg-ArtBlack leading-7 select-none w-full h-full flex flex-col text-center items-center justify-center gap-2">
      <DraggableWindow>
        <img
          draggable={false}
          className="w-20 stroke-red-50 no-drag invert drop-shadow-[0_0px_10px_rgba(226,204,74,0.25)] cursor-pointer"
          src="/Logo.svg"
        />
      </DraggableWindow>
      <span className="flex justify-center items-center">
        <span className="text-lg text-Porple">-&gt; </span>
        <h1 className="font-Inter text-5xl text-Porple">
          <Link to={"/"}>Oops!</Link>
        </h1>
      </span>
      <em className="font-Inter text-4xl">
        {error.status} - {error.statusText || error.message}
      </em>
    </div>
  );
};

export default ErrorPage;
