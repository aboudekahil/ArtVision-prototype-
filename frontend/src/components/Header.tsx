import React, { useContext } from "react";
import ArtLink from "./ArtLink";
import UserProfileMenu from "./UserProfileMenu";
import { LocalStorageUser } from "../shared.types";
import { AuthContext } from "../contexts/AuthContext.tsx";
import ArtImage from "./ArtImage.tsx";

type HeaderProps = {
  user?: LocalStorageUser;
};

const Header: React.FC<HeaderProps> = () => {
  const { user } = useContext(AuthContext)!;

  return (
    <header className="bg-ArtBlack2 w-full h-20">
      <nav className="w-full flex items-center align-middle h-full">
        <ArtLink aria-label="home page" to={"/"}>
          <ArtImage
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
            to={"/draw"}
            aria-label="Draw"
            className="capitalize select-none selection:cursor-pointer text-xl hover:text-Porple focus-visible:text-Porple font-semibold m-5"
          >
            Draw
          </ArtLink>
        )}
        <UserProfileMenu />
      </nav>
    </header>
  );
};

export default Header;
