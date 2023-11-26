import React, { useContext } from "react";
import ArtLink from "../ArtLink.tsx";
import UserProfileMenu from "./UserProfileMenu.tsx";
import { LocalStorageUser } from "../../shared.types.ts";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import ArtImage from "../ImageComponents/ArtImage.tsx";
import { useNavigate } from "react-router-dom";
import { createNewRoom } from "../../services/streamingService.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

type HeaderProps = {
  user?: LocalStorageUser;
};

const Header: React.FC<HeaderProps> = () => {
  const { user } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: () => {
      return toast.promise(createNewRoom(), {
        loading: "Creating room...",
        success: "Room Created!",
        error: (err) => err,
      });
    },
    onSuccess: (roomId: string) => {
      navigate(`/room/${roomId}`);
    },
  });

  const stream = () => mutation.mutate();

  return (
    <header className="bg-ArtBlack2 w-full h-20">
      <nav className="w-full flex items-center align-middle h-full">
        <ArtLink aria-label="home page" to={"/"}>
          <ArtImage
            fromServer={false}
            alt="ArtVision logo"
            aria-label="ArtVision logo"
            src="/Logo.svg"
            className="w-12 rounded-none object-contain"
            figureClassName="m-5 hover:motion-safe:animate-[ping_1s_ease-in-out] focus-visible:motion-safe:animate-[ping_1s_ease-in-out]"
          />
        </ArtLink>

        <ArtLink
          className="capitalize font-Inter select-none selection:cursor-pointer text-xl hover:text-Porple focus-visible:text-Porple font-semibold m-5"
          to={"/following"}
          aria-label="Following"
        >
          <h1 className="text-inherit transition">Following</h1>
        </ArtLink>

        {user && (
          <ArtLink
            onPress={stream}
            aria-label="Stream"
            className="capitalize select-none selection:cursor-pointer text-xl hover:text-Porple focus-visible:text-Porple font-semibold m-5"
          >
            Stream!
          </ArtLink>
        )}
        <UserProfileMenu />
      </nav>
    </header>
  );
};

export default Header;
