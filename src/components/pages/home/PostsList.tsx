import { Avatar, Box, Card } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { IUseSearchProps } from "../../../types";
import styles from "./PostList.module.css";
import PostImagesList from "./PostImagesList";
import PostInfo from "./PostInfo";

interface IPostsListProps {
  posts: IUseSearchProps[];
}

const PostsList: FC<IPostsListProps> = ({ posts }) => {
  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>Posts didn't find</h1>;
  }

  return (
    <>
      {posts.map((post, index) => (
        <Card key={`Post-${index}`} className={styles.card}>
          <Link key={post.id} to={`/profile${post.id}`} className={styles.link}>
            <Box
              sx={{
                position: "relative",
                marginRight: 2,
                width: 50,
                height: 50,
              }}
            >
              <Avatar
                src={post.avatar}
                alt="Image"
                sx={{ width: 46, height: 46, borderRadius: "50%" }}
              />
            </Box>
            <PostInfo post={post} />
          </Link>

          <p>{post.content}</p>

          <PostImagesList post={post} />
        </Card>
      ))}
    </>
  );
};

export default PostsList;
