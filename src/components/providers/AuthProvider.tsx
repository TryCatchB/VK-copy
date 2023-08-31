import { IUser, TypeSetState } from "../../types";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { users } from "../layout/sidebar/dataUsers";
import { Firestore, getFirestore } from "firebase/firestore";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
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
  isLoading: boolean;
  setUserInfo: Dispatch<SetStateAction<IUserInfo>>;
}

interface IUserInfo {
  birthday: string;
  city: string;
  language: string;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>({} as IUser);
  const [userInfo, setUserInfo] = useState<IUserInfo>({} as IUserInfo);
  const [isLoading, setIsLoading] = useState(true);

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

        const newUser = {
          ...user,
          ...userInfo,
        };

        setUser(newUser);
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });

    return () => unListen();
  }, []);

  const values = useMemo(
    () => ({ user, setUser, ga, db, isLoading, setUserInfo }),
    [user, ga]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
