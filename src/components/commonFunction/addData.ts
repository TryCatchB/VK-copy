import { Dispatch, SetStateAction } from "react";
import { IError, IUser } from "../../types";
import { Firestore } from "firebase/firestore";

interface IAddDataArgs {
  user: IUser | null;
  db: Firestore;
  message?: string;
  content?: string;
  addFunction: Function;
  setError: Dispatch<SetStateAction<IError | null>>;
  type: string;
}

export const addData = (data: IAddDataArgs) => {
  const { user, db, message, content, type, addFunction, setError } = data;
  const dataForAdd = { user, db, message, content, type };

  try {
    addFunction(dataForAdd);
  } catch (error: any) {
    setError(error);
  }
};
