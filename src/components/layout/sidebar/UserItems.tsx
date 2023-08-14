import { QuestionAnswer } from "@mui/icons-material";
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
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

const users = [
  {
    id: "dfsfds",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
    name: "Дмитрий Лыжин",
    isInNetwork: true,
  },
  {
    id: "dfsfdsds",
    avatar:
      "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1160",
    name: "Геннадий Иванов",
    isInNetwork: true,
  },
  {
    id: "dfsfdsqw4r",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Y3fquyUkRzsDwX-2-cyXnvzQXYeOtvIm1A32f8as3QuCNsGyWf76NWS0eJ35D17pamo&usqp=CAU",
    name: "Анатолий Прижков",
    isInNetwork: false,
  },
  {
    id: "dfsfdaasfass",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyV4HAxb-lZyPYWMD-iPEIjD59Ou__fJ6JetyB914ZPUGGRWfeEX5FsKpBNmOezaSFNRg&usqp=CAU",
    name: "Елена Васильевна",
    isInNetwork: false,
  },
];

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
