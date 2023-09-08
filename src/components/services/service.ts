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

interface IArgsGetUser {
  db: Firestore;
  id: string | undefined;
  setFunction: Dispatch<SetStateAction<IUser | null>>;
  typeGetData: string;
}

interface IArgsGetUsers {
  db: Firestore;
  setFunc: Dispatch<SetStateAction<IUser[]>>;
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

  static async getPosts(dataToGet: IArgsGetPost) {
    const { db, setFunction, typeGetData } = dataToGet;

    onSnapshot(collection(db, typeGetData), (docs) => {
      docs.forEach((d: any) => {
        setFunction((prev: IPost[]) => [d.data(), ...prev]);
      });
    });
  }

  static getUser(dataToGet: IArgsGetUser) {
    const { db, id, setFunction, typeGetData } = dataToGet;

    onSnapshot(collection(db, typeGetData), (snapshot) => {
      const docs: any = [];
      snapshot.forEach((doc) => {
        docs.push(doc);
      });

      const user = docs
        .map((doc: any) => doc.data())
        .flatMap((data: any) => data.users)
        .find((user: IUser) => user.id === id);

      if (user) {
        setFunction(user);
      }
    });
  }

  static getUsers(dataToGet: IArgsGetUsers) {
    const { db, setFunc, typeGetData } = dataToGet;

    onSnapshot(collection(db, typeGetData), (snapshot) => {
      const docs: any = [];
      snapshot.forEach((doc) => {
        docs.push(doc);
      });

      const users = docs
        .map((doc: any) => doc.data())
        .flatMap((data: any) => data.users);

      if (users) {
        setFunc(users);
      }
    });
  }
}

export default ServiceAPI;
