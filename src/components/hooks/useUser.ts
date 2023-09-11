import { Dispatch, SetStateAction, useEffect } from "react";
import ServiceAPI from "../services/service";
import { useParams } from "react-router-dom";
import { useAuth } from "../providers/useAuth";
import { IUser } from "../../types";

export const useUser = (
  setFunction: Dispatch<SetStateAction<IUser | null>>
) => {
  const { id } = useParams();
  const { db } = useAuth();

  useEffect(() => {
    const dataToGet = {
      db,
      id,
      setFunction,
      typeGetData: "users",
    };

    ServiceAPI.getUser(dataToGet);
  }, [id]);
};
