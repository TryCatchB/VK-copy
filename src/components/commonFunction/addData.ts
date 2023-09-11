import { Dispatch, SetStateAction } from "react";
import { IError, IUser } from "../../types";
import { Firestore } from "firebase/firestore";

interface IAddDataArgs {
  user: IUser | null;
  db: Firestore;
  message: string;
  addFunction: Function;
  setError: Dispatch<SetStateAction<IError | null>>;
  type: string;
}

export const addData = (user, db, message, addFunction, setError, type) => {
  const data = { user, db, message, type: type };

  try {
    addFunction(data);
  } catch (error: any) {
    setError(error);
  }
};
