import { Box } from "@mui/material";
import { FC, useState } from "react";
import AddPost from "./AddPost";
import { IPost } from "../../../types";
import Posts from "./Posts";
import { initialPosts } from "./initialPosts";

const Home: FC = () => {
  const [posts, setPosts] = useState<IPost[]>(initialPosts);

  return (
    <Box>
      <AddPost setPosts={setPosts} />
      <Posts posts={posts} />
    </Box>
  );
};

export default Home;
