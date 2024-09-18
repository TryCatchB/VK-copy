import { Avatar, Button, Card, Chip } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuth } from "../../providers/useAuth";

const User: FC = () => {
  const { ga, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(ga);
      navigate("/auth");
    } catch (error) {
      console.error("Sign out error: ", error);
    }
  };

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
      <Button variant="outlined" onClick={handleSignOut}>
        Выход
      </Button>
    </Card>
  );
};

export default User;
