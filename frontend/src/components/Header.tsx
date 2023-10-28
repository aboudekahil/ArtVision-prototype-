import React from "react";
import ArtLink from "./ArtLink";
import UserProfileMenu from "./UserProfileMenu";
import { LocalStorageUser } from "../shared.types";

type HeaderProps = {
  user?: LocalStorageUser;
};

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-ArtBlack2 w-full h-20">
      <nav className="w-full flex items-center align-middle h-full">
        <ArtLink aria-label="home page" to={"/"}>
          <figure className="m-5 hover:motion-safe:animate-[ping_1s_ease-in-out] focus-visible:motion-safe:animate-[ping_1s_ease-in-out]">
            <img
              className="w-8"
              alt="ArtVision logo"
              aria-label="ArtVision logo"
              src="/Logo.svg"
            />
          </figure>
        </ArtLink>

        <ArtLink
          className="capitalize select-none selection:cursor-pointer text-xl hover:text-Porple focus-visible:text-Porple font-semibold m-5"
          to={"/following"}
          aria-label="Following"
        >
          <h1 className="text-inherit">Following</h1>
        </ArtLink>

        <UserProfileMenu user={user} />
      </nav>
    </header>
  );
};

export default Header;
