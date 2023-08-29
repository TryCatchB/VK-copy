import { FC, useEffect, useState } from "react";
import { IPost } from "../../../types";
import { Avatar, Box, ImageList, ImageListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/useAuth";
import { initialPosts } from "./initialPosts";
import Card from "../../ui/Card";
import ServiceAPI from "../../services/service";

const Posts: FC = () => {
  const { db } = useAuth();
  const [posts, setPosts] = useState<IPost[]>(initialPosts);

  useEffect(() => {
    const dataToGet = { db, setFunction: setPosts, typeGetData: "posts" };

    ServiceAPI.getPost(dataToGet);
  }, []);

  return (
    <>
      {posts.map((post, index) => (
        <Card key={`Post-${index}`}>
          <Link
            key={post.author.id}
            to={`/profile${post.author.id}`}
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
                src={post.author.avatar}
                alt="Image"
                sx={{ width: 46, height: 46, borderRadius: "50%" }}
              />
            </Box>
            <div>
              <div style={{ fontSize: 14 }}>{post.author.name}</div>
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

export default Posts;
