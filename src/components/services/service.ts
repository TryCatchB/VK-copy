import { Firestore, addDoc, collection } from "firebase/firestore";
import { IUser } from "../../types";

interface IArgsPostRequest {
  user: IUser | null;
  db: Firestore;
  content: string;
  typeData: string;
}

export class ServiceAPI {
  static async postRequest(user, db, content, typeData) {
    await addDoc(collection(db, typeData), {
      author: user,
      content,
      createdAt: "10 минут назад.",
    });
  }
}
