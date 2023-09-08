import { QuestionAnswer } from "@mui/icons-material";
import { FC, useEffect, useState } from "react";
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
import ServiceAPI from "../../services/service";
import { useAuth } from "../../providers/useAuth";

const Users: FC = () => {
  const navigate = useNavigate();
  const { db } = useAuth();
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const dataToGet = { db, setFunc: setUsers, typeGetData: "users" };

    ServiceAPI.getUsers(dataToGet);
  }, []);

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
