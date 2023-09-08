import { FC, useEffect, useState } from "react";
import { useAuth } from "../../providers/useAuth";
import ServiceAPI from "../../services/service";
import { IUser } from "../../../types";
import UsersList from "../../ui/UsersList/UsersList";

const Friends: FC = () => {
  const { db } = useAuth();
  const [friends, setFriends] = useState<IUser[]>([]);

  useEffect(() => {
    const dataToGet = { db, setFunc: setFriends, typeGetData: "users" };

    ServiceAPI.getUsers(dataToGet);
  }, []);

  return (
    <div>
      <UsersList users={friends} />
    </div>
  );
};

export default Friends;
