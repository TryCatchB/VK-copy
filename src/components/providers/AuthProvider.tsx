import { IUser, TypeSetState } from "../../types";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { users } from "../layout/sidebar/dataUsers";
import { Firestore, getFirestore } from "firebase/firestore";
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
  db: Firestore;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>({} as IUser);

  const ga = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unListen = onAuthStateChanged(ga, (authUser) => {
      if (authUser) {
        const user = {
          id: authUser.uid,
          avatar: users[1].avatar,
          name: authUser.displayName || "",
        };

        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unListen();
  }, []);

  const values = useMemo(() => ({ user, setUser, ga, db }), [user, ga]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
