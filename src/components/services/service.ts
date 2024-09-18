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

  static getPosts(dataToGet: IArgsGetPost): () => void {
    const { db, setFunction, typeGetData } = dataToGet;

    const unsubscribe = onSnapshot(collection(db, typeGetData), (snapshot) => {
      const posts: IPost[] = [];
      snapshot.forEach((doc) => {
        posts.push(doc.data() as IPost);
      });
      setFunction(posts);
    });

    return unsubscribe;
  }

  static getUser(dataToGet: IArgsGetUser): () => void {
    const { db, id, setFunction, typeGetData } = dataToGet;

    const unsubscribe = onSnapshot(collection(db, typeGetData), (snapshot) => {
      const users: IUser[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.users) {
          users.push(...data.users);
        }
      });

      const user = users.find((user) => user.id === id);
      setFunction(user || null);
    });

    return unsubscribe;
  }

  static getUsers(dataToGet: IArgsGetUsers): () => void {
    const { db, setFunction, typeGetData } = dataToGet;

    const unsubscribe = onSnapshot(collection(db, typeGetData), (snapshot) => {
      const users: IUser[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.users) {
          users.push(...data.users);
        }
      });
      setFunction(users);
    });

    return unsubscribe;
  }

  static async addMessage(data: IArgsAddMessage): Promise<void> {
    const { user, message, db, type } = data;

    await addDoc(collection(db, type), {
      user,
      message,
    });
  }

  static getMessages(dataMessages: IArgsGetMessages): () => void {
    const { db, setFunction } = dataMessages;

    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      const messages: IMessage[] = [];
      snapshot.forEach((doc) => {
        messages.push(doc.data() as IMessage);
      });
      setFunction(messages);
    });

    return unsubscribe;
  }
}

export default ServiceAPI;
