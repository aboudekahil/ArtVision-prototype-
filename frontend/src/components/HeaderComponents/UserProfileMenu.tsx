import { Button } from "react-aria-components";
import PopupMenu from "./PopupMenu.tsx";
import { LocalStorageUser } from "../../shared.types.ts";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import LocalStorageHandler from "../../utils/LocalStorageHandler.ts";
import { useNavigate } from "react-router-dom";
import ArtLink from "../ArtLink.tsx";
import ArtImage from "../ImageComponents/ArtImage.tsx";

type UserProfileMenuProps = {
  user?: LocalStorageUser;
};

const UserProfileMenu: React.FC<UserProfileMenuProps> = () => {
  const { user, setUser } = useContext(AuthContext)!;
  const navigate = useNavigate();

  // return sign in button
  if (!user) {
    return (
      <ArtLink
        to="/signin"
        aria-label="sign in"
        className="font-Inter ml-auto m-5 rounded bg-Porple p-2"
      >
        Sign In
      </ArtLink>
    );
  }

  const handleLogout = () => {
    LocalStorageHandler.clearItem("curru");
    setUser(null);
    navigate("/");
    return;
  };

  return (
    <PopupMenu className="ml-auto m-5">
      <ArtImage
        className="w-12"
        src={user?.user.profile_image || "/pfpimages/defaultImage.png"}
        alt="profile picture"
        aria-label="profile picture"
      />

      <div className="bg-ArtBlack3 min-w-full rounded">
        <ul>
          <li>
            <ArtLink to={"/profile"}>
              <Button
                aria-label="Profile"
                className="p-5 w-full rounded focus-visible:bg-ArtBlack2 hover:bg-ArtBlack2 font-Inter"
              >
                Profile
              </Button>
            </ArtLink>
          </li>
          <li>
            <Button
              onPress={handleLogout}
              aria-label="Logout"
              className="p-5 w-full rounded focus-visible:bg-ArtBlack2 hover:bg-ArtBlack2 font-Inter"
            >
              Logout
            </Button>
          </li>
        </ul>
      </div>
    </PopupMenu>
  );
};

export default UserProfileMenu;
