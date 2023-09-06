import { Avatar, Card } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProfile: FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`/profile/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user data", error));
  }, [id]);

  console.log(user);

  return (
    <Card>
      {/* <Avatar src={user?.avatar} />
      <h1>{user?.name}</h1>
      <div className={styles.profile}>
        <p>День рождения:</p>
        <p>{user?.birthday}</p>
        <p>Город:</p>
        <p>{user?.city}</p>
        <p>Язык:</p>
        <p>{user?.language}</p>
      </div> */}
    </Card>
  );
};

export default UserProfile;
