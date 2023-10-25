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

  return (
    <>
      <Outlet />
    </>
  );
};

export default BasePage;
