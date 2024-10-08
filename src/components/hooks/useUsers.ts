import { Dispatch, SetStateAction, useEffect } from "react";
import ServiceAPI from "../services/service";
import { useAuth } from "../providers/useAuth";
import { IUser } from "../../types";

export const useUsers = (setFunction: Dispatch<SetStateAction<IUser[]>>) => {
  const { db } = useAuth();

  useEffect(() => {
    const dataToGet = { db, setFunction, typeGetData: "users" };

    const unsubscribe = ServiceAPI.getUsers(dataToGet);

    return () => unsubscribe();
  }, [db, setFunction]);
};
