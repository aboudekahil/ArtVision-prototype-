import { Link } from "react-router-dom";

type HeaderProps = {
  profile?: string;
};

const Header: React.FC<HeaderProps> = ({ profile }) => {
  return (
    <header className="bg-ArtBlack2 w-full h-20">
      <nav className="w-full flex items-center align-middle h-full">
        <Link to={"/"}>
          <figure className="m-5 hover:motion-safe:animate-[ping_1s_ease-in-out]">
            <img className="w-8" src="/Logo.svg" />
          </figure>
        </Link>

        <Link to={"/following"}>
          <h1 className="capitalize text-xl hover:text-Porple font-semibold m-5">
            Following
          </h1>
        </Link>

        <figure className="m-5 ml-auto cursor-pointer">
          <img
            className="w-8 rounded-full"
            src={profile || "/pfpimages/defaultImage.png"}
          />
        </figure>
      </nav>
    </header>
  );
};

export default Header;
