import React, { useContext } from "react";
import ArtLink from "../ArtLink.tsx";
import UserProfileMenu from "./UserProfileMenu.tsx";
import { LocalStorageUser } from "../../shared.types.ts";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import ArtImage from "../ImageComponents/ArtImage.tsx";
import { useNavigate } from "react-router-dom";
import { createNewRoom } from "../../services/streamingService.ts";

type HeaderProps = {
  user?: LocalStorageUser;
};

const Header: React.FC<HeaderProps> = () => {
  const { user } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const stream = async () => {
    const roomId = await createNewRoom();
    navigate(`/room/${roomId}`);
  };

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
            aria-label="Draw"
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
