import { useEffect } from "react";
import ServiceAPI from "../services/service";

export const useUsers = () => {
  useEffect(() => {
    const dataToGet = { db, setFunc: setFriends, typeGetData: "users" };

    ServiceAPI.getUsers(dataToGet);
  }, []);
};
