import { Firestore, addDoc, collection, onSnapshot } from "firebase/firestore";
import { IPost, IUser } from "../../types";
import { Dispatch, SetStateAction } from "react";

interface IArgsPostRequest {
  user: IUser | null;
  db: Firestore;
  content: string;
  typeRequest: string;
}

interface IArgsGetPost {
  db: Firestore;
  setFunction: Dispatch<SetStateAction<IPost[]>>;
  typeGetData: string;
}

class ServiceAPI {
  static async postRequest(dataToRequest: IArgsPostRequest): Promise<void> {
    const { user, db, content, typeRequest } = dataToRequest;

    await addDoc(collection(db, typeRequest), {
      ...user,
      content,
      createdAt: "10 минут назад.",
    });
  }

  static async getPost(dataToGet: IArgsGetPost) {
    const { db, setFunction, typeGetData } = dataToGet;

    onSnapshot(collection(db, typeGetData), (docs) => {
      docs.forEach((d: any) => {
        setFunction((prev: IPost[]) => [d.data(), ...prev]);
      });
    });
  }
}

export default ServiceAPI;
