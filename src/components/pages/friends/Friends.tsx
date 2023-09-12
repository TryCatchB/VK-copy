import { FC, useContext, useState } from "react";
import { IUser } from "../../../types";
import UsersList from "../../ui/UsersList/UsersList";
import { useUsers } from "../../hooks/useUsers";
import { queryProvider } from "../../providers/QueryProvider";
import { useSearch } from "../../hooks/useSearch";
import Loader from "../../ui/Loader/Loader";

const Friends: FC = () => {
  const [friends, setFriends] = useState<IUser[]>([]);
  const { query } = useContext(queryProvider);

  const searchedFriends = useSearch(friends, query);

  useUsers(setFriends);

  if (!friends.length) {
    return <Loader />;
  }

  return (
    <div>
      <UsersList users={searchedFriends} />
    </div>
  );
};

export default Friends;
