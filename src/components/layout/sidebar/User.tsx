import { Button, Card } from "@mui/material";
import { FC } from "react";

const User: FC = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        padding: 2,
        backgroundColor: "#f1f7fa",
        borderRadius: 3,
        border: "none",
      }}
    >
      <Button>Выход</Button>
    </Card>
  );
};

export default User;
