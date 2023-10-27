import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LocalStorageHandler from "../utils/LocalStorageHandler";
import { LocalStorageUser } from "../shared.types";

const BasePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let user = LocalStorageHandler.getFromKeyParsed<LocalStorageUser>("curru");

    if (!user) navigate("/signin");
  }, []);

  let curr = LocalStorageHandler.getFromKeyParsed<LocalStorageUser>("curru");
  console.log(curr);
  return (
    <>
      {curr && <img src={curr?.user.profile_image} />}
      <Outlet />
    </>
  );
};

export default BasePage;
