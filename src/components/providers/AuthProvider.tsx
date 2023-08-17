import { IUser, TypeSetState } from "../../types";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { users } from "../layout/sidebar/dataUsers";
import {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface IContext {
  user: IUser | null;
  setUser: TypeSetState<IUser | null>;
  ga: Auth;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const ga = getAuth();

  useEffect(() => {
    const unListen = onAuthStateChanged(ga, (authUser) => {
      if (authUser) {
        setUser({
          id: authUser.uid,
          avatar: users[1].avatar,
          name: authUser.displayName || "",
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      unListen();
    };
  }, []);

  const values = useMemo(
    () => ({
      user,
      setUser,
      ga,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={{ user, setUser, ga }}>
      {children}
    </AuthContext.Provider>
  );
};
