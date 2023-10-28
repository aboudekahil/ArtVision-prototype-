import { Button } from "react-aria-components";
import PopupMenu from "./PopupMenu";
import { userProfileImage } from "../services/userService";
import { LocalStorageUser } from "../shared.types";

type UserProfileMenuProps = {
  user?: LocalStorageUser;
};

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({ user }) => {
  return (
    <PopupMenu className="ml-auto m-5">
      <figure>
        <img
          className="w-8 rounded-full"
          src={user?.user.profile_image || "/pfpimages/defaultImage.png"}
          onError={async (e) => {
            try {
              e.currentTarget.src = "/pfpimages/defaultImage.png";
              await userProfileImage(user?.user.email as string);
            } catch (error) {}
          }}
          alt="profile picture"
          aria-label="profile picture"
        />
      </figure>

      <div className="bg-ArtBlack3 min-w-full rounded">
        <ul>
          <li>
            <Button className="p-5 w-full rounded focus-visible:bg-ArtBlack2 hover:bg-ArtBlack2 font-Inter">
              Profile
            </Button>
          </li>
          <li>
            <Button className="p-5 w-full rounded focus-visible:bg-ArtBlack2 hover:bg-ArtBlack2 font-Inter">
              Logout
            </Button>
          </li>
        </ul>
      </div>
    </PopupMenu>
  );
};

export default UserProfileMenu;
