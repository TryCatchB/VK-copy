import { Avatar, Button, Card, Chip } from "@mui/material";
import { FC } from "react";
import { useAuth } from "../../providers/useAuth";
import { Auth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const User: FC = () => {
  const { user, ga } = useAuth();

  const navigate = useNavigate();

  const exit = (ga: Auth): void => {
    signOut(ga);
    navigate("/auth");
  };

  console.log(user);

  return (
    <Card
      variant="outlined"
      sx={{
        padding: 2,
        backgroundColor: "#f1f7fa",
        borderRadius: 3,
        marginBottom: 5,
        border: "none",
      }}
    >
      <Chip
        avatar={<Avatar alt="" src={user?.avatar} />}
        label={user?.name || "Без имени"}
        variant="outlined"
        sx={{ display: "flex", marginBottom: 2 }}
      />
      <Button variant="outlined" onClick={() => exit(ga)}>
        Выход
      </Button>
    </Card>
  );
};

export default User;
