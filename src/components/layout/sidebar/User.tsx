import { Avatar, Button, Card, Chip } from "@mui/material";
import { FC } from "react";
import { useAuth } from "../../providers/useAuth";
import { signOut } from "firebase/auth";

const User: FC = () => {
  const { ga, user } = useAuth();

  return (
    <Card
      variant="outlined"
      sx={{
        padding: 2,
        backgroundColor: "#f1f7fa",
        border: "none",
        borderRadius: 3,
        marginBottom: 5,
      }}
    >
      <Chip
        avatar={<Avatar alt="" src={user?.avatar} />}
        label={user?.name || "без имени"}
        variant="outlined"
        sx={{ display: "flex", marginBottom: 2 }}
      />
      <Button variant="outlined" onClick={() => signOut(ga)}>
        Выход
      </Button>
    </Card>
  );
};

export default User;
