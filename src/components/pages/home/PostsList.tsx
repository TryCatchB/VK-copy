import { Avatar, Box, Card, ImageList, ImageListItem } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { IUseSearchProps } from "../../../types";

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
        <Card key={`Post-${index}`}>
          <Link
            key={post.id}
            to={`/profile${post.id}`}
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
                src={post.avatar}
                alt="Image"
                sx={{ width: 46, height: 46, borderRadius: "50%" }}
              />
            </Box>
            <div>
              <div style={{ fontSize: 14 }}>{post.name}</div>
              <div style={{ fontSize: 14, opacity: "0,6" }}>
                {post.createdAt}
              </div>
            </div>
          </Link>

          <p>{post.content}</p>

          {post?.images?.length && (
            <ImageList variant="masonry" cols={3} gap={8}>
              {post.images.map((image) => (
                <ImageListItem key={image}>
                  <img src={image} alt="" />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Card>
      ))}
    </>
  );
};

export default PostsList;
