import React, {
  createContext,
  PropsWithChildren,
  useLayoutEffect,
  useState,
} from "react";
import { LocalStorageUser } from "../shared.types.ts";
import LocalStorageHandler from "../utils/LocalStorageHandler.ts";
import Requests from "../http-common.ts";

type AuthContext = {
  user?: LocalStorageUser | null;
  setUser: (user: LocalStorageUser | null | undefined) => void;
  isFullProfile: boolean;
};

const AuthContext = createContext<AuthContext>({
  setUser: () => {
    throw new Error("There is no provider given for this context");
  },
  isFullProfile: false,
});

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, _setUser] = useState<LocalStorageUser | null>();
  const [isFullProfile, setFullProfile] = useState(false);

  const setUser = (user: LocalStorageUser | null | undefined) => {
    if (!user) {
      LocalStorageHandler.clearItem("curru");
      _setUser(null);
      Requests.defaults.headers.common["Authorization"] = null;
      setFullProfile(false);
      return;
    }
    LocalStorageHandler.setItem("curru", user);
    _setUser(user);
    Requests.defaults.headers.common["Authorization"] = "Bearer " + user.token;
    setFullProfile(user.user.bio !== undefined);
  };

  useLayoutEffect(() => {
    const curru =
      LocalStorageHandler.getFromKeyParsed<LocalStorageUser>("curru") || null;

    setUser(curru);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isFullProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
