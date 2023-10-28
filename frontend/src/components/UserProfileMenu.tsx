import { Button } from "react-aria-components";
import PopupMenu from "./PopupMenu";

type UserProfileMenuProps = {
  profile?: string;
};

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({ profile }) => {
  return (
    <PopupMenu className="ml-auto m-5">
      <figure>
        <img
          className="w-8 rounded-full"
          src={profile || "/pfpimages/defaultImage.png"}
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
