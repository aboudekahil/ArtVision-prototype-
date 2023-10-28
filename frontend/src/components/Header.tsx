import React, { useRef, useState } from "react";
import { PopUpMenu, PopUpMenuItem } from "./PopupMenu";
import ArtLink from "./ArtLink";

type HeaderProps = {
  profile?: string;
};

const Header: React.FC<HeaderProps> = ({ profile }) => {
  const [visibleMenu, setVisibleMenu] = useState(false);

  const userProfile = useRef<HTMLImageElement>(null);

  return (
    <header className="bg-ArtBlack2 w-full h-20">
      <nav className="w-full flex items-center align-middle h-full">
        <ArtLink to={"/"}>
          <figure className="m-5 hover:motion-safe:animate-[ping_1s_ease-in-out]">
            <img className="w-8" src="/Logo.svg" />
          </figure>
        </ArtLink>

        <ArtLink
          className="capitalize select-none selection:cursor-pointer text-xl hover:text-Porple font-semibold m-5"
          to={"/following"}
        >
          <h1 className="text-inherit">Following</h1>
        </ArtLink>

        <PopUpMenu className="m-5 ml-auto cursor-pointer">
          <PopUpMenuItem>
            <figure>
              <img
                ref={userProfile}
                onClick={() => setVisibleMenu(!visibleMenu)}
                className="w-8 rounded-full"
                src={profile || "/pfpimages/defaultImage.png"}
              />
            </figure>
          </PopUpMenuItem>

          <PopUpMenuItem>
            <div className="w-20 h-20 bg-Porple"></div>
          </PopUpMenuItem>
        </PopUpMenu>
      </nav>
    </header>
  );
};

export default Header;
