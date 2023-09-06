import { ImageList, ImageListItem } from "@mui/material";
import { FC } from "react";
import { IUseSearchProps } from "../../../types";

interface IPostsImageListProps {
  post: IUseSearchProps;
}

const PostImagesList: FC<IPostsImageListProps> = ({ post }) => {
  return (
    <>
      {post?.images?.length && (
        <ImageList variant="masonry" cols={3} gap={8}>
          {post.images.map((image) => (
            <ImageListItem key={image}>
              <img src={image} alt="" />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </>
  );
};

export default PostImagesList;
