import { Avatar, Box } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../../types";
import styles from "./UsersList.module.css";

interface IUsersListProps {
  users: IUser[];
}

const UsersList: FC<IUsersListProps> = ({ users }) => {
  return (
    <>
      {users.map((user: any) => (
        <Link key={user.id} to={`/profile/${user.id}`} className={styles.link}>
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
    </>
  );
};

export default UsersList;
