import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LocalStorageHandler from "../utils/LocalStorageHandler";
import { LocalStorageUser } from "../shared.types";
import Header from "../components/Header";

const BasePage = () => {
  const navigate = useNavigate();

  const [artUser, setArtUser] = useState<LocalStorageUser>();

  useEffect(() => {
    let user = LocalStorageHandler.getFromKeyParsed<LocalStorageUser>("curru");

    if (!user) {
      navigate("/signin");
      return;
    }

    setArtUser(user);
  }, []);

  return (
    <>
      <Header profile={artUser?.user.profile_image} />
      <Outlet />
    </>
  );
};

export default BasePage;
