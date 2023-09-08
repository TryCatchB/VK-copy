import { IUser, TypeSetState } from "../../types";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
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
  isLoading: boolean;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>({} as IUser);

  const ga = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unListen = onAuthStateChanged(ga, (authUser) => {
      if (authUser) {
        const user = {
          id: authUser.uid,
          avatar: "https://cdn-icons-png.flaticon.com/512/1177/1177568.png",
          name: authUser.displayName || "",
        };

        const response = localStorage.getItem("userInfo");

        if (response !== null) {
          const newUser = createObject(user, response);
          setUser(newUser);
        }
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });
    return () => unListen();
  }, []);

  function createObject(user: IUser, response: string): IUser {
    const data = JSON.parse(response);

    const newUser = {
      ...user,
      ...data,
    };
    return newUser;
  }

  const values = useMemo(
    () => ({ user, setUser, ga, db, isLoading }),
    [user, ga]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
