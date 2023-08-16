import { QuestionAnswer } from "@mui/icons-material";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { users } from "./dataUsers";
import {
  Avatar,
  Box,
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const UserItems: FC = () => {
  const navigate = useNavigate();

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
      {users.map((user) => (
        <Link
          key={user.id}
          to={`/profile${user.id}`}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            marginBottom: 12,
            color: "#111",
          }}
        >
          <Box
            sx={{
              position: "relative",
              marginRight: 2,
              width: 50,
              height: 50,
            }}
          >
            <Avatar
              src={user.avatar}
              alt="Image"
              sx={{ width: 46, height: 46, borderRadius: "50%" }}
            />
            {user.isInNetwork && (
              <Box
                sx={{
                  backgroundColor: "#4fb14f",
                  border: "2px solid #f1f7fa",
                  width: 12,
                  height: 12,
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  borderRadius: "50%",
                }}
              />
            )}
          </Box>
          <span style={{ fontSize: 14 }}>{user.name}</span>
        </Link>
      ))}
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

export default UserItems;
