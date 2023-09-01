import { FC } from "react";
import { useAuth } from "../../providers/useAuth";
import Card from "../../ui/Card";
import { Avatar } from "@mui/material";
import styles from "./Profile.module.css";

const Profile: FC = () => {
  const { user } = useAuth();

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

export default Profile;
