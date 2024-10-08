import { QuestionAnswer } from "@mui/icons-material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import UsersList from "../../ui/UsersList/UsersList";
import { IUser } from "../../../types";
import { useUsers } from "../../hooks/useUsers";
import Loader from "../../ui/Loader/Loader";

const Users: FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);

  useUsers(setUsers);

  if (!users.length) {
    return <Loader />;
  }

  return (
    <Card
      variant="outlined"
      sx={{
        padding: 2,
        backgroundColor: "#f1f7fa",
        border: "none",
        borderRadius: 3,
      }}
    >
      <UsersList users={users} />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/messages")}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <QuestionAnswer />
            </ListItemIcon>
            <ListItemText primary="Сообщения" />
          </ListItemButton>
        </ListItem>
      </List>
    </Card>
  );
};

export default Users;
