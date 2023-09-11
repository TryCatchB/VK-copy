import { QuestionAnswer } from "@mui/icons-material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersList from "../../ui/UsersList/UsersList";
import { IUser } from "../../../types";
import { useUsers } from "../../hooks/useUsers";
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const Users: FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);

  useUsers(setUsers);

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
