import { Avatar } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceAPI from "../../services/service";
import { useAuth } from "../../providers/useAuth";
import { IUser } from "../../../types";
import styles from "./Profile.module.css";
import Card from "../../ui/Card";

const UserProfile: FC = () => {
  const { id } = useParams();
  const { db } = useAuth();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const dataToGet = { db, id, setFunction: setUser, typeGetData: "users" };

    ServiceAPI.getUser(dataToGet);
  }, [id]);

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
