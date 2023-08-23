import { FC, useEffect, useState } from "react";
import { useAuth } from "../../providers/useAuth";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { IMessage } from "../../../types";

const Messages: FC = () => {
  const { user, db } = useAuth();
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unSub = onSnapshot(collection(db, "messages"), (doc) => {
      doc.forEach((d: any) => {
        setMessages((prev) => [...prev, d.data()]);
      });
    });

    return () => unSub();
  }, []);

  const addMessageHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" && user) {
      try {
        await addDoc(collection(db, "messages"), {
          user,
          message,
        });
      } catch (error: any) {
        setError(error);
      }

      setMessage("");
    }
  };

  return <div>messages</div>;
};

export default Messages;
