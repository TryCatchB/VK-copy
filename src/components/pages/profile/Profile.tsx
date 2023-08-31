import { FC } from "react";
import { useAuth } from "../../providers/useAuth";
import Card from "../../ui/Card";
import { Avatar } from "@mui/material";

const Profile: FC = () => {
  const { user } = useAuth();

  return (
    <Card>
      <Avatar src={user?.avatar} />
      <div>
        <h1>{user?.name}</h1>
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
