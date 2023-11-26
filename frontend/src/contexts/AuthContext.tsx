import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import { LocalStorageUser } from "../shared.types.ts";
import LocalStorageHandler from "../utils/LocalStorageHandler.ts";
import Requests from "../http-common.ts";

type AuthContext = {
  user: LocalStorageUser | null;
  setUser: (user: LocalStorageUser | null) => void;
  isFullProfile: boolean;
};

const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => {
    throw new Error("There is no provider given for this context");
  },
  isFullProfile: false,
});

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, _setUser] = useState<LocalStorageUser | null>(
    LocalStorageHandler.getFromKeyParsed<LocalStorageUser>("curru"),
  );
  const [isFullProfile, setFullProfile] = useState(
    !!user && user.user.bio !== undefined,
  );

  const setUser = useCallback((user: LocalStorageUser | null) => {
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
  }, []);

  useLayoutEffect(() => {
    if (!user) {
      LocalStorageHandler.clearItem("curru");
      Requests.defaults.headers.common["Authorization"] = null;
      return;
    }
    Requests.defaults.headers.common["Authorization"] = "Bearer " + user.token;
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isFullProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
