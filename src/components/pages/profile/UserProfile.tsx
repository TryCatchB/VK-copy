import { Avatar } from "@mui/material";
import { FC, useState } from "react";
import { IUser } from "../../../types";
import styles from "./Profile.module.css";
import Card from "../../ui/Card";
import { useUser } from "../../hooks/useUser";

const UserProfile: FC = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useUser(setUser);

  return (
    <Card>
      <Avatar src={user?.avatar} />
      <h1>{user?.name}</h1>
      <div className={styles.profile}>
        <p>День рождения:</p>
        <p>{user?.birthday}</p>
        <p>Город:</p>
        <p>{user?.city}</p>
        <p>Язык:</p>
        <p>{user?.language}</p>
      </div>
    </Card>
  );
};

export default UserProfile;
