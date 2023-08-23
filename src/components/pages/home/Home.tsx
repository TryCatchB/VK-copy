import { Box } from "@mui/material";
import { FC } from "react";
import AddPost from "./AddPost";

import Posts from "./Posts";

const Home: FC = () => {
  return (
    <Box>
      <AddPost />
      <Posts />
    </Box>
  );
};

export default Home;
