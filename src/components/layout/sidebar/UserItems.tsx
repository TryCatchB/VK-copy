import { Box } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

const UserItems: FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Link to="/profile">
        <Box sx={{ position: "relative", marginRight: 5 }}>
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
            alt="Image"
          />
          <Box
            sx={{
              backgroundColor: "green",
              width: 4,
              height: 4,
              position: "absolute",
              bottom: 2,
              left: 2,
            }}
          ></Box>
        </Box>
        <span>Дмитрий Лыжин</span>
      </Link>
    </Box>
  );
};

export default UserItems;
