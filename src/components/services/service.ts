import { Dispatch, SetStateAction } from "react";
import { Firestore, addDoc, collection, onSnapshot } from "firebase/firestore";
import { IMessage, IPost, IUser } from "../../types";

interface IArgsBase {
  db: Firestore;
}

interface IArgsWithSetFunction<T> extends IArgsBase {
  setFunction: Dispatch<SetStateAction<T>>;
}

interface IArgsAddPost extends IArgsBase {
  user: IUser | null;
  content: string;
  type: string;
}

interface IArgsGetPost extends IArgsWithSetFunction<IPost[]> {
  typeGetData: string;
}

interface IArgsGetUser extends IArgsWithSetFunction<IUser | null> {
  id: string | undefined;
  typeGetData: string;
}

interface IArgsGetUsers extends IArgsWithSetFunction<IUser[]> {
  typeGetData: string;
}

interface IArgsGetMessages extends IArgsWithSetFunction<IMessage[]> {}

interface IArgsAddMessage extends IArgsBase {
  user: IUser | null;
  message: string;
  type: string;
}

class ServiceAPI {
  static async addPost(data: IArgsAddPost): Promise<void> {
    const { user, db, content, type } = data;

    await addDoc(collection(db, type), {
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
    const { db, setFunction, typeGetData } = dataToGet;

    const userCollection = collection(db, typeGetData);

    onSnapshot(userCollection, (snapshot) => {
      const docs: any = [];
      snapshot.forEach((doc) => {
        docs.push(doc.data());
      });

      const users = docs.flatMap((data: any) => data.users);

      if (users) {
        setFunction(users);
      }
    });
  }

  static async addMessage(data: IArgsAddMessage) {
    const { user, message, db, type } = data;

    await addDoc(collection(db, type), {
      user,
      message,
    });
  }

  static getMessages(dataMessages: IArgsGetMessages) {
    const { db, setFunction } = dataMessages;

    return onSnapshot(collection(db, "messages"), (doc) => {
      const array: IMessage[] = [];

      doc.forEach((d: any) => {
        array.push(d.data());
      });

      setFunction(array);
    });
  }
}

export default ServiceAPI;
