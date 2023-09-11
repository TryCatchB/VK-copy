import { FC, useContext, useState } from "react";
import { IUser } from "../../../types";
import UsersList from "../../ui/UsersList/UsersList";
import { useUsers } from "../../hooks/useUsers";
import { queryProvider } from "../../providers/QueryProvider";
import { useSearch } from "../../hooks/useSearch";

const Friends: FC = () => {
  const [friends, setFriends] = useState<IUser[]>([]);
  const { query } = useContext(queryProvider);

  const searchedFriends = useSearch(friends, query);

  useUsers(setFriends);

  return (
    <div>
      <UsersList users={searchedFriends} />
    </div>
  );
};

export default Friends;
