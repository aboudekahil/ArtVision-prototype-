import { Link } from "react-router-dom";

const Header: React.FC = () => {
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
      </nav>
    </header>
  );
};

export default Header;
